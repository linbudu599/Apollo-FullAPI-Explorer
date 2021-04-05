import { Service } from 'typedi';
import {
  Connection,
  FindConditions,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { InjectRepository, InjectConnection } from 'typeorm-typedi-extensions';

import Task from '../entities/Task';

import { PaginationOptions } from '../graphql/Common';
import {
  ITask,
  TaskQueryInput,
  TaskCreateInput,
  TaskRelation,
  TaskUpdateInput,
} from '../graphql/Task';

import { TypeORMCacheIds } from '../utils/constants';

export interface ITaskService {
  getAllTasks(
    pagination: Required<PaginationOptions>,
    relations: TaskRelation[]
  ): Promise<Task[]>;
  getOneTaskById(
    taskId: number,
    relations: TaskRelation[]
  ): Promise<Task | undefined>;
  getOneTaskByConditions(
    conditions: TaskQueryInput,
    relations: TaskRelation[]
  ): Promise<Task | undefined>;
  getTasksByConditions(
    conditions: FindConditions<Task>,
    pagination: Required<PaginationOptions>,
    relations: TaskRelation[]
  ): Promise<Task[]>;

  createTask(task: TaskCreateInput | Task): Promise<Task>;
  updateTask(
    indicator: number,
    infoUpdate: Partial<TaskUpdateInput>
  ): Promise<Task>;
  deleteTask(taskId: number): Promise<void>;
}

@Service()
export default class TaskService implements ITaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectConnection()
    private readonly connection: Connection
  ) {}

  private generateSelectBuilder(relations: TaskRelation[]) {
    let selectQueryBuilder = this.taskRepository.createQueryBuilder('task');

    if (relations.includes('assignee')) {
      selectQueryBuilder = selectQueryBuilder.leftJoinAndSelect(
        'task.assignee',
        'assignee'
      );
    }

    if (relations.includes('taskSubstance')) {
      selectQueryBuilder = selectQueryBuilder.leftJoinAndSelect(
        'task.taskSubstance',
        'substance'
      );
    }

    if (relations.includes('relatedRecord')) {
      selectQueryBuilder = selectQueryBuilder
        .leftJoinAndSelect('task.relatedRecord', 'records')
        .leftJoinAndSelect('records.recordAccount', 'recordAccount')
        .leftJoinAndSelect('records.recordExecutor', 'recordExecutor')
        .leftJoinAndSelect('records.recordSubstance', 'recordSubstance');
    }

    return selectQueryBuilder;
  }

  private TaskConditionQuery(
    conditions: TaskQueryInput,
    relations: TaskRelation[] = []
  ) {
    let initialSelectBuilder = this.generateSelectBuilder(relations);

    Object.keys(conditions).forEach((key) => {
      initialSelectBuilder = initialSelectBuilder.andWhere(
        `task.${key}= :${key}`,
        {
          [key]: conditions[key],
        }
      );
    });

    return initialSelectBuilder;
  }

  async getAllTasks(
    pagination: Required<PaginationOptions>,
    relations: TaskRelation[] = []
  ): Promise<Task[]> {
    const { offset, take } = pagination;

    const res = await this.generateSelectBuilder(relations)
      .skip(offset)
      .take(take)
      .cache(TypeORMCacheIds.task, 1000 * 5)
      .getMany();

    return res;
  }

  async getOneTaskById(
    taskId: number,
    relations: TaskRelation[] = []
  ): Promise<Task | undefined> {
    const res = await this.generateSelectBuilder(relations)
      .where('task.taskId = :taskId', { taskId })
      .getOne();

    return res;
  }

  async getOneTaskByConditions(
    conditions: TaskQueryInput,
    relations: TaskRelation[] = []
  ): Promise<Task | undefined> {
    const res = await this.TaskConditionQuery(conditions, relations).getOne();

    return res;
  }

  async getTasksByConditions(
    conditions: TaskQueryInput,
    pagination: Required<PaginationOptions>,
    relations: TaskRelation[] = []
  ): Promise<Task[]> {
    const res = await this.TaskConditionQuery(conditions, relations).getMany();
    return res;
  }

  async createTask(task: TaskCreateInput | Task): Promise<Task> {
    const res = await this.taskRepository.save(task);
    await this.connection.queryResultCache?.remove([
      TypeORMCacheIds.task,
      TypeORMCacheIds.substance,
    ]);
    return res;
  }

  async updateTask(
    indicator: number,
    infoUpdate: Partial<TaskUpdateInput>
  ): Promise<Task> {
    await this.taskRepository.update(indicator, infoUpdate);

    const updatedItem = (await this.getOneTaskById(indicator))!;

    return updatedItem;
  }

  async deleteTask(taskId: number): Promise<void> {
    await this.taskRepository
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where('taskId = :taskId')
      .setParameter('taskId', taskId)
      .execute();

    await this.connection.queryResultCache?.remove([
      TypeORMCacheIds.task,
      TypeORMCacheIds.substance,
    ]);
  }

  async getFullTaskByRecordId(recordId: number): Promise<Task[]> {
    const res = await this.generateSelectBuilder([
      'relatedRecord',
      'assignee',
      'taskSubstance',
    ])
      .where('records.recordId = :recordId', { recordId })
      .getMany();

    return res;
  }
}
