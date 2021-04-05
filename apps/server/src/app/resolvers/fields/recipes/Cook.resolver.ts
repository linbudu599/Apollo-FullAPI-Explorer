import { Service } from 'typedi';
import { Resolver, Arg, FieldResolver, Root, Ctx } from 'type-graphql';

import { Cook, WorkExperience } from '../../../graphql/Recipe';
import RecipeService from '../../../services/Recipe.service';
import { log } from '../../../utils/helper';
import { IContext } from '../../../typing';

@Service()
@Resolver((type) => Cook)
export default class CookResolver {
  constructor(private readonly recipeService: RecipeService) {
    // created for each request (scoped)
    log('=== RecipeService Created! ===');
  }

  @FieldResolver((type) => WorkExperience)
  WorkExperienceExtraFieldResolver(
    @Root() root: Cook,
    @Arg('year') year: number,
    @Ctx() ctx: IContext
  ) {
    // return this.recipeService.getWorkEXPByYear(year);
    return ctx.dataLoader.loaders.recipeLoader.workExpLoader.load(year);
  }
}
