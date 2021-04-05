import { Resolver, Query, Arg } from 'type-graphql';
import { useContainer as TypeORMUseContainer, getConnection } from 'typeorm';

import Executor from '../entities/Executor';
import Task from '../entities/Task';

import ExecutorService from '../services/Executor.service';
import PublicService from '../services/Public.service';
import TaskService from '../services/Task.service';
import SubstanceService from '../services/Substance.service';

import { Service } from 'typedi';
import { IExecutorDesc } from '../graphql/Executor';
import { PaginationOptions, PrimitiveStatus } from '../graphql/Common';
import { LevelQueryResult, DifficultyLevel } from '../graphql/Public';

import { DEFAULT_QUERY_PAGINATION } from '../utils/constants';

@Service()
@Resolver((of) => PrimitiveStatus)
export default class PublicResolver {
  constructor(
    private readonly executorService: ExecutorService,
    // private readonly taskService: TaskService,
    // private readonly substanceService: SubstanceService,
    private readonly publicService: PublicService
  ) {
    // console.log('publicService: ', publicService);
  }

  // @Query(() => [LevelQueryResult], {
  //   nullable: false,
  //   description: '基于级别获取所有执行者与任务',
  // })
  // async QueryByDifficultyLevel(
  //   @Arg('difficulty', (type) => DifficultyLevel, { nullable: true })
  //   difficulty: DifficultyLevel,

  //   @Arg('pagination', { nullable: true })
  //   pagination: PaginationOptions
  // ): Promise<(Executor | Task)[]> {
  //   const queryPagination = (pagination ??
  //     DEFAULT_QUERY_PAGINATION) as Required<PaginationOptions>;

  //   const executors = await this.executorService.getAllExecutors(
  //     queryPagination,
  //     ['tasks']
  //   );

  //   const tasks = await this.taskService.getAllTasks(queryPagination, [
  //     'assignee',
  //     'taskSubstance',
  //   ]);

  //   if (typeof difficulty === 'undefined') {
  //     return [...executors, ...tasks];
  //   }

  //   const filterExecutors = executors.filter(
  //     (executor) =>
  //       (JSON.parse(executor.desc) as IExecutorDesc).level === difficulty
  //   );

  //   const filterTasks = tasks.filter(
  //     (task) => String(task.taskLevel) === String(difficulty)
  //   );

  //   return [...filterExecutors, ...filterTasks];
  // }

  @Query(() => Date, { nullable: false, description: '容器注册时间' })
  async ContainerRegisterTime() {
    const registerDate = await this.publicService.ContainerRegisterTime();

    return registerDate;
  }

  @Query(() => String, { nullable: false, description: '容器注册时间' })
  async str() {
    console.log(getConnection().name);
    return 'str';
  }
}
