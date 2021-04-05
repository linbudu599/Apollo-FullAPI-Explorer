import { Resolver, Query, Arg } from 'type-graphql';

import { RecipeUnionResult, Cook, Recipe, SaltFish } from './module';
import { sampleCooks, sampleRecipes, sampleSaltFishes } from './data';

@Resolver()
export default class RecipeResolver {
  private recipesData: Recipe[] = sampleRecipes;
  private cooksData: Cook[] = sampleCooks;
  private saltFishesData: SaltFish[] = sampleSaltFishes;

  @Query(() => [RecipeUnionResult])
  async QueryRecipeUnions(): Promise<typeof RecipeUnionResult[]> {
    return [...this.recipesData, ...this.cooksData, ...this.saltFishesData];
  }
}
