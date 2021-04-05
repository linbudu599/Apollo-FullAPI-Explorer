import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql';

import Task from '../../entities/Task';
import Substance from '../../entities/Substance';

import { IContext } from '../../typing';

@Resolver((of) => Substance)
export default class SubstanceFieldResolver {
  @FieldResolver(() => Task)
  async SubstanceInnerTaskFieldResolver(
    @Root() substance: Substance,
    @Ctx() ctx: IContext
  ) {
    return await ctx.dataLoader.loaders.Substance.relatedTask.load(substance);
  }
}
