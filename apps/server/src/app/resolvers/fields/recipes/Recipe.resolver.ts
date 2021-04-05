import { Service } from 'typedi';
import {
  Resolver,
  Query,
  Arg,
  UseMiddleware,
  Int,
  Authorized,
  Directive,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';

import {
  RecipeUnionResult,
  Difficulty,
  Recipe,
  SaltFish,
  Cook,
} from '../../../graphql/Recipe';

import RecipeService from '../../../services/Recipe.service';

import CacheMiddleware from '../../../middlewares/cache';

import { log } from '../../../utils/helper';

import { ACCOUNT_TYPE, ACCOUNT_ROLE, AuthRule } from '../../../utils/constants';
import { IContext } from '../../../typing';

@Service()
@Resolver((type) => Recipe)
export default class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {
    // created for each request (scoped)
    log('=== RecipeService Created! ===');
  }

  @Directive(
    '@sampleDeprecated(reason: "Sample Deprecated Apply On QueryRecipeUnions Resolver")'
  )
  @Authorized([ACCOUNT_TYPE.VISITOR, [ACCOUNT_ROLE.UNKNOWN]] as AuthRule)
  @Query(() => [RecipeUnionResult], {
    nullable: false,
    description: '返回所有菜谱 厨师 和 咸鱼',
  })
  // 以下任一缓存控制都能生效
  @UseMiddleware(CacheMiddleware)
  // @CacheControl(RecipeCacheHint)
  async QueryRecipeUnions(): Promise<typeof RecipeUnionResult[]> {
    const recipes = await this.recipeService.getAllRecipes();
    const cooks = await this.recipeService.getAllCooks();
    const saltFishes = await this.recipeService.getAllSaltFishes();

    return [...recipes, ...cooks, ...saltFishes];
  }

  @Authorized([ACCOUNT_TYPE.ADMIN, [ACCOUNT_ROLE.GOV]] as AuthRule)
  @Query(() => [Recipe], { nullable: false, description: '基于难度查找菜谱' })
  async QueryRecipesByDifficulty(
    @Arg('difficulty', (type) => Difficulty, { nullable: true })
    difficulty?: Difficulty
  ): Promise<Recipe[]> {
    return this.recipeService.getRecipesByDifficulty(difficulty);
  }

  @Query(() => [Recipe], { nullable: false, description: '基于作料查找菜谱' })
  async QueryRecipesByIngredients(
    @Arg('ingredients', () => [String], { nullable: true })
    ingredients: string[]
  ): Promise<Recipe[]> {
    return this.recipeService.getRecipesByIngredients(ingredients);
  }

  @Query(() => [SaltFish], {
    nullable: false,
    description: '根据恩格尔系数查找咸鱼',
  })
  async QuerySaltFishByCoefficient(
    @Arg('coefficient', () => Int, { nullable: true })
    coefficient?: number
  ): Promise<SaltFish[]> {
    return this.recipeService.getSaltFishesByCoefficient(coefficient);
  }

  // 展示DataLoader使用
  @Query(() => [Recipe], {
    nullable: false,
    description: 'DataLoader 实际效果演示',
  })
  async Recipes(): Promise<Recipe[]> {
    return this.recipeService.getAllRecipes();
  }

  @FieldResolver((type) => Recipe, { nullable: true })
  RecipeExtraFieldResolver(
    @Root() root: Recipe,
    @Arg('title') title: string,
    @Ctx() ctx: IContext
  ) {
    // return this.recipeService.getRecipeByTitle(title);
    return ctx.dataLoader.loaders.recipeLoader.rootRecipeLoader.load(title);
  }

  @FieldResolver((type) => Cook)
  CookExtraFieldResolver(
    @Root() root: Recipe,
    @Arg('name') name: string,
    @Ctx() ctx: IContext
  ) {
    // return this.recipeService.getCookByName(name);
    return ctx.dataLoader.loaders.recipeLoader.cookLoader.load(name);
  }

  // 如果要使以下的字段级解析器生效(即能够多层次嵌套), 你需要定义多个Resolver
  // 当前的@Resolver中指定了类型为Recipe, 所以这些额外解析器都只会被锁定在type Recipe下
  // @FieldResolver((type) => WorkExperience)
  // WorkExperienceExtraFieldResolver(
  //   @Root() root: Cook,
  //   @Arg("year") year: number,
  //   @Ctx() ctx: IContext
  // ) {
  //   return this.recipeService.getWorkEXPByYear(year);
  // }

  // @FieldResolver((type) => Company)
  // CompanyExtraFieldResolver(
  //   @Root() root: WorkExperience,
  //   @Arg("name") name: string,
  //   @Ctx() ctx: IContext
  // ) {
  //   return this.recipeService.getCampanyByName(name);
  // }
}
