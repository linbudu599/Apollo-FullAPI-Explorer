import {
  Resolver,
  Query,
  Arg,
  Args,
  Mutation,
  Authorized,
  UseMiddleware,
  Ctx,
  FieldResolver,
  Root,
  Int,
} from 'type-graphql';

import Executor, { ExecutorDesc } from '../entities/Executor';

import ExecutorService from '../services/Executor.service';

import {
  ExecutorCreateInput,
  ExecutorUpdateInput,
  ExecutorQueryArgs,
  ExecutorDescUpdateInput,
  ExecutorDescQuery,
  IExecutorDesc,
  ExecutorRelationsInput,
  getExecutorRelations,
  ExecutorRelation,
} from '../graphql/Executor';
import {
  PaginationOptions,
  StatusHandler,
  ExecutorStatus,
} from '../graphql/Common';

import { RESPONSE_INDICATOR } from '../utils/constants';
import { mergeJSONWithObj, generatePagination } from '../utils/helper';
import { InjectCurrentUser, CustomArgsValidation } from '../decorators';

import { ExtraFieldLogMiddlewareGenerator } from '../middlewares/log';

import { IContext } from '../typing';

@Resolver((of) => Executor)
export default class ExecutorResolver {
  constructor(private readonly executorService: ExecutorService) {}

  @Query(() => ExecutorStatus, {
    nullable: false,
    description: '获取所有执行者',
  })
  @UseMiddleware(ExtraFieldLogMiddlewareGenerator('Check All ExecutorS'))
  async QueryAllExecutors(
    @Ctx() ctx: IContext,
    @InjectCurrentUser() user: IContext['currentUser'],

    @Arg('pagination', { nullable: true })
    pagination: PaginationOptions,

    @Arg('relations', (type) => ExecutorRelationsInput, { nullable: true })
    relationOptions: Partial<ExecutorRelationsInput> = {}
  ): Promise<ExecutorStatus> {
    try {
      const queryPagination = generatePagination(pagination);
      const relations: ExecutorRelation[] = getExecutorRelations(
        relationOptions
      );
      // const ExecutorsWithTasks = await this.executorService.getAllExecutors(
      //   queryPagination,
      //   relations
      // );

      return new StatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS
        // ExecutorsWithTasks
      );
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => ExecutorStatus, {
    nullable: false,
    description: '根据ID查找特定执行者信息',
  })
  async QueryExecutorById(
    @Arg('uid', (type) => Int) uid: number,

    @Arg('relations', (type) => ExecutorRelationsInput, { nullable: true })
    relationOptions: Partial<ExecutorRelationsInput> = {}
  ): Promise<ExecutorStatus> {
    try {
      const relations: ExecutorRelation[] = getExecutorRelations(
        relationOptions
      );
      // const executor = await this.executorService.getOneExecutorById(
      //   uid,
      //   relations
      // );

      // if (!executor) {
      //   return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      // }
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, []);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => ExecutorStatus, {
    nullable: false,
    description: '根据基本条件查找执行者',
  })
  @CustomArgsValidation(ExecutorQueryArgs)
  async QueryExecutorByConditions(
    @Args({ validate: false }) conditions: ExecutorQueryArgs,

    @Arg('relations', (type) => ExecutorRelationsInput, { nullable: true })
    relationOptions: Partial<ExecutorRelationsInput> = {}
  ): Promise<ExecutorStatus> {
    try {
      const relations: ExecutorRelation[] = getExecutorRelations(
        relationOptions
      );

      // const res = await this.executorService.getExecutorsByConditions(
      //   conditions,
      //   relations
      // );

      // const isEmpty = res.length === 0;

      // return new StatusHandler(
      //   !isEmpty,
      //   isEmpty ? RESPONSE_INDICATOR.NOT_FOUND : RESPONSE_INDICATOR.SUCCESS,
      //   res
      // );
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => ExecutorStatus, {
    nullable: false,
    description: '根据描述（等级、成功率、评分）查找执行者',
  })
  async QueryExecutorByDesc(
    @Args((type) => ExecutorDescQuery) desc: ExecutorDescQuery,

    @Arg('pagination', { nullable: true })
    pagination: PaginationOptions,

    @Arg('relations', (type) => ExecutorRelationsInput, { nullable: true })
    relationOptions: Partial<ExecutorRelationsInput> = {}
  ) {
    const queryPagination = generatePagination(pagination);
    const relations: ExecutorRelation[] = getExecutorRelations(relationOptions);

    const { level, successRate, satisfaction } = desc;

    // const executors = await this.executorService.getAllExecutors(
    //   queryPagination,
    //   relations
    // );

    // const filterExecutors = executors.filter((executor) => {
    //   const descObj = JSON.parse(executor.desc) as IExecutorDesc;

    //   const levelEqual =
    //     typeof level === "undefined" ? true : descObj.level === level;

    //   const successRateEqual =
    //     typeof successRate === "undefined"
    //       ? true
    //       : descObj.successRate === successRate;

    //   const satisfactionEqual =
    //     typeof satisfaction === "undefined"
    //       ? true
    //       : descObj.satisfaction === satisfaction;

    //   return levelEqual && successRateEqual && satisfactionEqual;
    // });

    // return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, filterExecutors);
  }

  @Mutation(() => ExecutorStatus, {
    nullable: false,
    description: '添加执行者',
  })
  async CreateExecutor(
    @Arg('newExecutorInfo') executor: ExecutorCreateInput
  ): Promise<ExecutorStatus> {
    try {
      // const isExistingExecutor = await this.executorService.getOneExecutorByConditions(
      //   {
      //     name: executor.name,
      //   }
      // );
      // if (isExistingExecutor) {
      //   return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, [
      //     isExistingExecutor,
      //   ]);
      // }
      // const res = await this.executorService.createExecutor(executor);
      // return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => ExecutorStatus, {
    nullable: false,
    description: '更新执行者描述',
  })
  async UpdateExecutorDesc(
    @Arg('uid', (type) => Int) uid: number,
    @Arg('userDesc') desc: ExecutorDescUpdateInput
  ): Promise<ExecutorStatus> {
    try {
      // const isExistingExecutor = await this.executorService.getOneExecutorById(
      //   uid
      // );
      // if (!isExistingExecutor) {
      //   return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      // }
      // const res = await this.executorService.updateExecutor(uid, {
      //   desc: mergeJSONWithObj(isExistingExecutor.desc, desc),
      // });
      // return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => ExecutorStatus, {
    nullable: false,
    description: '更新执行者基本信息',
  })
  async UpdateExecutorBasicInfo(
    @Arg('modifiedExecutorInfo') executor: ExecutorUpdateInput
  ): Promise<ExecutorStatus> {
    try {
      // const isExistingExecutor = await this.executorService.getOneExecutorById(
      //   executor.uid
      // );
      // if (!isExistingExecutor) {
      //   return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      // }
      // const res = await this.executorService.updateExecutor(
      //   executor.uid,
      //   executor
      // );
      // return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => ExecutorStatus, {
    nullable: false,
    description: '删除执行者',
  })
  async DeleteExecutor(
    @Arg('uid', (type) => Int) uid: number
  ): Promise<ExecutorStatus> {
    try {
      // const isExistingExecutor = await this.executorService.getOneExecutorById(
      //   uid
      // );
      // if (!isExistingExecutor) {
      //   return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      // }
      // await this.executorService.deleteExecutor(uid);
      // return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, []);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @FieldResolver(() => Int, {
    nullable: false,
    description: '字段级解析器示例',
  })
  async spAgeField(
    @Root() executor: Executor,
    @Arg('param', { nullable: true }) param?: number
  ): Promise<number> {
    // ... do sth addtional here
    return executor.age ?? 990;
  }

  @FieldResolver(() => ExecutorDesc, {
    nullable: false,
    description: '获取对象类型的执行者描述',
  })
  async ExecutorDescField(@Root() executor: Executor): Promise<ExecutorDesc> {
    const { desc } = executor;
    return JSON.parse(desc);
  }
}
