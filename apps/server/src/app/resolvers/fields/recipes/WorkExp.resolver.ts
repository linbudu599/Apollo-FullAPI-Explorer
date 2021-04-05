import { Service } from 'typedi';
import { Resolver, Arg, FieldResolver, Root, Ctx } from 'type-graphql';

import { WorkExperience, Company } from '../../../graphql/Recipe';
import RecipeService from '../../../services/Recipe.service';
import { log } from '../../../utils/helper';
import { IContext } from '../../../typing';

@Service()
@Resolver((type) => WorkExperience)
export default class WorkExperienceResolver {
  constructor(private readonly recipeService: RecipeService) {
    // created for each request (scoped)
    log('=== RecipeService Created! ===');
  }

  @FieldResolver((type) => Company)
  CompanyExtraFieldResolver(
    @Root() root: WorkExperience,
    @Arg('name') name: string,
    @Ctx() ctx: IContext
  ) {
    // return this.recipeService.getCampanyByName(name);
    return ctx.dataLoader.loaders.recipeLoader.companyLoader.load(name);
  }
}
