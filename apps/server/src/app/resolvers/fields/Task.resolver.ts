import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql';

import Task from '../../entities/Task';
import Executor from '../../entities/Executor';
import Substance from '../../entities/Substance';

import { IContext } from '../../typing';

@Resolver((of) => Task)
export default class TaskFieldResolver {
  @FieldResolver(() => Substance)
  async TaskInnerSubstanceFieldResolver(
    @Root() task: Task,
    @Ctx() ctx: IContext
  ) {
    return await ctx.dataLoader.loaders.Task.taskSubstance.load(task);
  }

  @FieldResolver(() => Executor)
  async TaskInnerExecutorFieldResolver(
    @Root() task: Task,
    @Ctx() ctx: IContext
  ) {
    return await ctx.dataLoader.loaders.Task.assignee.load(task);
  }
}
