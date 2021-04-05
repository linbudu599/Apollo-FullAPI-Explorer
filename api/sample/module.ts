import {
  Field,
  ObjectType,
  Int,
  registerEnumType,
  createUnionType,
} from 'type-graphql';

export enum Difficulty {
  Beginner,
  Easy,
  Medium,
  Hard,
  MasterChef,
}

export enum CompanyScale {
  Small,
  Middle,
  Huge,
}

registerEnumType(Difficulty, {
  name: 'Difficulty',
  description: 'All possible preparation difficulty levels',
});

registerEnumType(CompanyScale, {
  name: 'CompanyScale',
  description: 'Company Scale',
});

@ObjectType()
export class Company {
  @Field()
  name!: string;

  @Field(() => CompanyScale, { nullable: true })
  scale!: CompanyScale;

  @Field()
  registerDate!: Date;

  @Field()
  description!: string;
}

@ObjectType()
export class WorkExperience {
  @Field((type) => Company)
  company!: Company;

  @Field()
  isFired!: boolean;

  @Field()
  workYears!: number;
}

@ObjectType()
export class Cook {
  @Field()
  name!: string;

  @Field((type) => Int)
  yearsOfExperience!: number;

  @Field((type) => WorkExperience)
  experience!: WorkExperience;
}

@ObjectType()
export class Recipe {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => [String], { nullable: true })
  ingredients!: string[];

  @Field((type) => Difficulty, { nullable: true })
  preparationDifficulty!: Difficulty;

  @Field({ nullable: true })
  cook!: Cook;
}

@ObjectType({ description: 'useless object type in union type:)' })
export class SaltFish {
  @Field((type) => Int)
  EngelCoefficient!: number;
}

export const RecipeUnionResult = createUnionType({
  name: 'RecipeUnionResult',
  types: () => [Recipe, Cook, SaltFish] as const,
});
