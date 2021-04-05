import { Resolver, Query, Ctx, Mutation } from 'type-graphql';

import PrismaUser from '../../graphql/prisma/User';
import PrismaItem from '../../graphql/prisma/Item';

import { IContext } from '../../typing';

@Resolver()
export default class PrismaResolver {
  @Query((returns) => [PrismaUser])
  async QueryAllPrismaUsers(@Ctx() ctx: IContext): Promise<PrismaUser[]> {
    return await ctx.prisma.user.findMany({ include: { items: true } });
    return [];
  }

  @Query((returns) => [PrismaItem])
  async QueryAllPrismaItems(@Ctx() ctx: IContext): Promise<PrismaItem[]> {
    return await ctx.prisma.item.findMany({ include: { owner: true } });
    return [];
  }

  @Mutation((returns) => Boolean, { nullable: true })
  async ReturnNullOnly(): Promise<boolean> {
    return null;
  }
}
