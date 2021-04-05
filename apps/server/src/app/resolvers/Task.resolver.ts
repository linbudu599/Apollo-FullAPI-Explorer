import { Resolver, Query, Arg, Mutation } from 'type-graphql';

import Task from '../entities/Task';

import {
  PaginationOptions,
  StatusHandler,
  TaskStatus,
} from '../graphql/Common';
import {
  TaskQueryInput,
  TaskCreateInput,
  TaskUpdateInput,
  TaskRelationsInput,
  getTaskRelations,
  TaskRelation,
} from '../graphql/Task';
import { DifficultyLevel } from '../graphql/Public';

import TaskService from '../services/Task.service';
import ExecutorService from '../services/Executor.service';
import SubstanceService from '../services/Substance.service';

import { RESPONSE_INDICATOR } from '../utils/constants';

import { generatePagination } from '../utils/helper';

@Resolver((of) => Task)
export default class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly executorService: ExecutorService,
    private readonly SubstanceService: SubstanceService
  ) {}

  @Query(() => TaskStatus, { nullable: false, description: '获取所有任务' })
  async QueryAllTasks(
    @Arg('pagination', { nullable: true })
    pagination: PaginationOptions,

    @Arg('relations', (type) => TaskRelationsInput, { nullable: true })
    relationOptions: Partial<TaskRelationsInput> = {}
  ): Promise<TaskStatus> {
    try {
      const queryPagination = generatePagination(pagination);
      const relations: TaskRelation[] = getTaskRelations(relationOptions);

      const res = this.taskService.getAllTasks(queryPagination, relations);

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, res);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => TaskStatus, { nullable: false, description: '基于ID获取任务' })
  async QueryTaskByID(
    @Arg('taskId') taskId: number,

    @Arg('relations', (type) => TaskRelationsInput, { nullable: true })
    relationOptions: Partial<TaskRelationsInput> = {}
  ): Promise<TaskStatus> {
    try {
      const relations: TaskRelation[] = getTaskRelations(relationOptions);
      const res = await this.taskService.getOneTaskById(taskId, relations);

      if (!res) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => TaskStatus, {
    nullable: false,
    description: '基于条件获取单个任务',
  })
  async QueryTaskByConditions(
    @Arg('taskQueryParams') param: TaskQueryInput,

    @Arg('relations', (type) => TaskRelationsInput, { nullable: true })
    relationOptions: Partial<TaskRelationsInput> = {}
  ): Promise<TaskStatus> {
    try {
      const relations: TaskRelation[] = getTaskRelations(relationOptions);

      const res = await this.taskService.getOneTaskByConditions(
        param,
        relations
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => TaskStatus, {
    nullable: false,
    description: '基于条件获取多个任务',
  })
  async QueryTasksByConditions(
    @Arg('taskQueryParams') param: TaskQueryInput,

    @Arg('pagination', { nullable: true })
    pagination: PaginationOptions,

    @Arg('relations', (type) => TaskRelationsInput, { nullable: true })
    relationOptions: Partial<TaskRelationsInput> = {}
  ): Promise<TaskStatus> {
    try {
      const queryPagination = generatePagination(pagination);

      const relations: TaskRelation[] = getTaskRelations(relationOptions);

      const res = await this.taskService.getTasksByConditions(
        param,
        queryPagination,
        relations
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, res);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => TaskStatus, {
    nullable: false,
    description: '查询执行者当前被分配的任务',
  })
  async QueryExecutorTasks(
    @Arg('uid') uid: number,

    @Arg('pagination', { nullable: true })
    pagination: PaginationOptions,

    @Arg('relations', (type) => TaskRelationsInput, { nullable: true })
    relationOptions: Partial<TaskRelationsInput> = {}
  ) {
    try {
      const queryPagination = generatePagination(pagination);

      // const executor = await this.executorService.getOneExecutorById(uid);

      // if (!executor) {
      //   return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      // }

      const relations: TaskRelation[] = getTaskRelations(relationOptions);

      const res = await this.taskService.getTasksByConditions(
        {
          assignee: {
            uid,
          },
        },
        queryPagination,
        relations
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, res);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => TaskStatus, { nullable: false, description: '变更任务状态' })
  async ToggleTaskStatus(@Arg('taskId') taskId: number): Promise<TaskStatus> {
    try {
      const origin = await this.taskService.getOneTaskById(taskId);

      if (!origin)
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);

      const res = await this.taskService.updateTask(taskId, {
        taskAccmplished: !origin.taskAccmplished,
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => TaskStatus, { nullable: false, description: '删除任务' })
  async DeleteTask(@Arg('taskId') taskId: number): Promise<TaskStatus> {
    try {
      const res = await this.taskService.getOneTaskById(taskId);
      if (!res) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      if (res.assignee) {
        return new StatusHandler(
          false,
          RESPONSE_INDICATOR.MUTATION_NOT_ALLOWED,
          []
        );
      }

      await this.taskService.deleteTask(taskId);

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, []);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => TaskStatus, {
    nullable: true,
    description: '创建任务同时关联到实体',
  })
  async CreateNewTask(
    @Arg('taskCreateParam') param: TaskCreateInput
  ): Promise<TaskStatus> {
    try {
      const { substanceId } = param;
      const substance = await this.SubstanceService.getOneSubstanceById(
        substanceId
      );

      if (!substance) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      if (substance.relatedTaskId) {
        return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, [
          substance,
        ]);
      }

      const { taskTitle } = param;

      const isTitleUsed = await this.taskService.getOneTaskByConditions(
        {
          taskTitle,
        },
        ['taskSubstance']
      );

      if (isTitleUsed) {
        return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, [
          isTitleUsed,
        ]);
      }

      param.taskSubstance = substance;

      const res = await this.taskService.createTask(param);

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => TaskStatus, {
    nullable: false,
    description: '变更任务基本信息',
  })
  async UpdateTaskInfo(
    @Arg('taskUpdateParam') param: TaskUpdateInput
  ): Promise<TaskStatus> {
    try {
      const taskExists = await this.taskService.getOneTaskById(param.taskId);
      if (!taskExists) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      const res = await this.taskService.updateTask(param.taskId, param);

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => TaskStatus, { nullable: false, description: '指派任务' })
  async AssignTask(
    @Arg('taskId') taskId: number,
    @Arg('uid') uid: number
  ): Promise<TaskStatus> {
    try {
      // const assignee = await this.executorService.getOneExecutorById(uid);
      // const task = await this.taskService.getOneTaskById(taskId, ["assignee"]);
      // if (!task || !assignee) {
      //   return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      // }
      // if (task.assignee) {
      //   return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, [task]);
      // }
      // task.assignee = assignee;
      // const assignRes = await this.taskService.createTask(task);
      // return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [assignRes]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => TaskStatus, {
    nullable: false,
    description: '变更任务级别',
  })
  async MutateTaskLevel(
    @Arg('taskId') taskId: number,
    @Arg('level', (type) => DifficultyLevel) level: DifficultyLevel
  ): Promise<TaskStatus> {
    try {
      const res = await this.taskService.getOneTaskById(taskId);
      if (!res) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      // const updated = await this.taskService.updateTask(taskId, {
      //   taskLevel: level,
      // });

      // return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updated]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => TaskStatus, {
    nullable: false,
    description: '冻结任务 无法恢复',
  })
  async FreezeTask(@Arg('taskId') taskId: number): Promise<TaskStatus> {
    try {
      const res = await this.taskService.getOneTaskById(taskId);
      if (!res) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      const updated = await this.taskService.updateTask(taskId, {
        taskAvaliable: false,
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updated]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }
}
