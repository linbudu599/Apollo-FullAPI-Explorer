import { Service, Inject } from 'typedi';

import {
  Difficulty,
  Cook,
  Recipe,
  SaltFish,
  Company,
  WorkExperience,
} from '../graphql/Recipe';
import { sampleSaltFishes } from '../utils/mock';

export interface IRecipeService {
  getAllRecipes(): Promise<Recipe[]>;
  getAllCooks(): Promise<Cook[]>;
  getAllSaltFishes(): Promise<SaltFish[]>;
  getRecipesByDifficulty(difficulty?: Difficulty): Promise<Recipe[]>;
  getRecipesByIngredients(ingredients: string[]): Promise<Recipe[]>;
  getSaltFishesByCoefficient(coefficient: number): Promise<SaltFish[]>;
}

// make it global and be used across all the containers
@Service({ global: true })
export default class RecipeService implements IRecipeService {
  // import data or inject it
  private saltFishes: SaltFish[] = sampleSaltFishes;

  constructor(
    @Inject('RECIPES_DATA') private readonly recipes: Recipe[],
    @Inject('COOKS_DATA') private readonly cooks: Cook[],
    @Inject('WORKEXP_DATA') private readonly workExps: WorkExperience[],
    @Inject('COMPANYS_DATA') private readonly companies: Company[]
  ) {}

  async getAllRecipes(): Promise<Recipe[]> {
    return this.recipes;
  }

  // DataLoader Apply Start

  async getRecipeByTitle(title: string): Promise<Recipe | null> {
    console.log('Single Load [Recipe] Invoked');
    return this.recipes.find((recipe) => recipe.title === title) ?? null;
  }

  // batch load method for DataLoader
  async getRecipesByTitles(titles: Readonly<string[]>): Promise<Recipe[]> {
    console.log('Batch Load [Recipe] Invoked');
    return this.recipes.filter((recipe) => titles.includes(recipe.title));
  }

  async getCookByName(name: string): Promise<Cook | null> {
    console.log('Single Load [Cook] Invoked');
    return this.cooks.find((cook) => cook.name === name) ?? null;
  }

  async getCookByNames(names: Readonly<string[]>): Promise<Cook[]> {
    console.log('Batch Load [Cook] Invoked');
    return this.cooks.filter((cook) => names.includes(cook.name));
  }

  async getWorkEXPByYear(year: number): Promise<WorkExperience | null> {
    console.log('Single Load [WorkEXP] Invoked');
    return this.workExps.find((exp) => exp.workYears === year) ?? null;
  }

  async getWorkEXPsByYears(
    years: Readonly<number[]>
  ): Promise<WorkExperience[]> {
    console.log('Batch Load [WorkEXP] Invoked');
    return this.workExps.filter((exp) => years.includes(exp.workYears));
  }

  async getCampanyByName(name: string): Promise<Company | null> {
    console.log('Single Load [Company] Invoked');
    return this.companies.find((company) => company.name === name) ?? null;
  }

  async getCompaniesByNames(names: Readonly<string[]>): Promise<Company[]> {
    console.log('Batch Load [Company] Invoked');
    return this.companies.filter((company) => names.includes(company.name));
  }

  // DataLoader Apply End

  async getRecipesByDifficulty(difficulty?: Difficulty): Promise<Recipe[]> {
    return difficulty
      ? this.recipes.filter(
          (recipe) => recipe.preparationDifficulty === difficulty
        )
      : this.recipes;
  }

  async getRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
    const recipesList = this.recipes;
    switch (ingredients?.length) {
      case 0 || undefined:
        return recipesList;
      case 1:
        return recipesList.filter((recipe) =>
          recipe.ingredients.includes(ingredients[0])
        );
      default:
        return recipesList.filter((recipe) => {
          return ingredients.every((level) =>
            recipe.ingredients.includes(level)
          );
        });
    }
  }

  async getAllCooks(): Promise<Cook[]> {
    return this.cooks;
  }

  async getAllSaltFishes(): Promise<SaltFish[]> {
    return this.saltFishes;
  }

  async getSaltFishesByCoefficient(coefficient?: number): Promise<SaltFish[]> {
    return coefficient
      ? this.saltFishes.filter((fish) => fish.EngelCoefficient === coefficient)
      : this.saltFishes;
  }
}
