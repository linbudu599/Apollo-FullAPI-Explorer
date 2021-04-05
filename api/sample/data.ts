import { plainToClass } from 'class-transformer';

import {
  Difficulty,
  CompanyScale,
  Cook,
  Recipe,
  Company,
  SaltFish,
  WorkExperience,
} from './module';

const createWorkExperience = (
  workExp: Partial<WorkExperience>
): WorkExperience => plainToClass(WorkExperience, workExp);

const createSaltFish = (fish: Partial<SaltFish>): SaltFish =>
  plainToClass(SaltFish, fish);

const createCompany = (company: Partial<Company>): Company =>
  plainToClass(Company, company);

const createCook = (cookData: Partial<Cook>): Cook =>
  plainToClass(Cook, cookData);

const createRecipe = (recipeData: Partial<Recipe>): Recipe =>
  plainToClass(Recipe, recipeData);

export const sampleSaltFishes = [
  createSaltFish({
    EngelCoefficient: 90,
  }),
  createSaltFish({
    EngelCoefficient: 80,
  }),
];

export const sampleCompanies = [
  createCompany({
    name: 'XX有限公司',
    scale: CompanyScale.Small,
    registerDate: new Date(),
    description: '小公司罢了',
  }),
  createCompany({
    name: '不渡科技有限公司',
    scale: CompanyScale.Huge,
    registerDate: new Date(),
    description: '我直接世界500强',
  }),
];

export const sampleWorkExperience = [
  createWorkExperience({
    company: sampleCompanies[0],
    isFired: true,
    workYears: 1,
  }),
  createWorkExperience({
    company: sampleCompanies[1],
    isFired: false,
    workYears: 10,
  }),
];

export const sampleCooks = [
  createCook({
    name: 'Gordon Ramsay',
    yearsOfExperience: 21,
    experience: sampleWorkExperience[0],
  }),
  createCook({
    name: 'Kim Kardashian',
    yearsOfExperience: 1,
    experience: sampleWorkExperience[1],
  }),
];

export const sampleRecipes = [
  createRecipe({
    title: 'Recipe 1',
    description: 'Desc 1',
    preparationDifficulty: Difficulty.Easy,
    ingredients: ['one', 'two', 'three'],
    cook: sampleCooks[1],
  }),
  createRecipe({
    title: 'Recipe 2',
    description: 'Desc 2',
    preparationDifficulty: Difficulty.Easy,
    ingredients: ['four', 'five', 'six'],
    cook: sampleCooks[0],
  }),
  createRecipe({
    title: 'Recipe 3',
    description: 'Desc 3',
    preparationDifficulty: Difficulty.Beginner,
    ingredients: ['seven', 'eight', 'nine'],
    cook: sampleCooks[1],
  }),
  createRecipe({
    title: 'Recipe 4',
    description: 'Desc 4',
    preparationDifficulty: Difficulty.MasterChef,
    ingredients: ['ten', 'eleven', 'twelve'],
    cook: sampleCooks[0],
  }),
  createRecipe({
    title: 'Recipe 5',
    description: 'Desc 5',
    preparationDifficulty: Difficulty.Hard,
    ingredients: ['thirteen', 'fourteen', 'fifteen'],
    cook: sampleCooks[0],
  }),
];
