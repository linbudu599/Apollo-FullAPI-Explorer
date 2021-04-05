import {
  Field,
  ObjectType,
  Int,
  registerEnumType,
  createUnionType,
  Directive,
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

@Directive('@cacheControl(maxAge: 1000)')
@ObjectType({
  description: 'Recipe >>> Cook >>> WorkExperience >> Company',
  // skip auth & middleware stack & ...
  simpleResolvers: true,
})
export class Company {
  @Field()
  name!: string;

  @Field((type) => CompanyScale)
  scale!: CompanyScale;

  @Field()
  description!: string;

  @Field((type) => Date)
  registerDate!: Date;
}
@Directive('@cacheControl(maxAge: 1000)')
@ObjectType({ description: 'Recipe >>> Cook >>> WorkExperience' })
export class WorkExperience {
  @Field((type) => Company)
  company!: Company;

  @Field()
  isFired!: boolean;

  @Field((type) => Int)
  workYears!: number;
}

@Directive('@cacheControl(maxAge: 1000)')
@ObjectType({ description: 'Recipe >>> Cook' })
export class Cook {
  @Field()
  name!: string;

  @Field((type) => Int)
  yearsOfExperience!: number;

  @Field((type) => WorkExperience)
  experience!: WorkExperience;
}

@Directive('@cacheControl(maxAge: 1000)')
@ObjectType({ description: 'Recipe Type' })
export class Recipe {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => [String], { nullable: true })
  ingredients!: string[];

  @Field((type) => Difficulty, { nullable: true })
  preparationDifficulty!: Difficulty;

  @Field((type) => Cook)
  cook!: Cook;
}

@Directive('@auth(requires: USER)')
@Directive(
  '@sampleDeprecated(reason: "Sample Deprecated Apply On SaltFish ObjectType")'
)
@Directive('@cacheControl(maxAge: 1000)')
@ObjectType({
  description: 'useless object type in union type, just for funny:)',
})
export class SaltFish {
  @Directive(
    '@sampleDeprecated(reason: "Sample Deprecated Apply On SaltFish.EngelCoefficient Field")'
  )
  @Field((type) => Int)
  EngelCoefficient!: number;

  // @Directive("@upper")
  // @Directive("@lower")
  // @Directive("@camel")
  // @Directive("@start")
  // @Directive("@capitalize")
  // @Directive("@kebab")
  @Directive('@snake')
  // @Directive("@trim")
  // @Directive('@fetch(url:"https://linbudu.top")')
  @Directive('@auth(requires: USER)')
  @Field()
  fishName!: string;

  @Directive('@date(format: "mmmm d, yyyy")')
  @Field((type) => Date)
  date!: Date;

  @Field((type) => AuthDirectiveRoleEnum, { nullable: true })
  role?: AuthDirectiveRoleEnum;

  // @Directive("@max(max: 10)")
  // @Directive("@min(min: 10)")
  @Field({ nullable: true })
  str!: string;

  // @Directive("@greater(limit: 10)")
  // @Directive("@less(limit: 10)")
  @Field((type) => Int, { nullable: true })
  num!: number;
}

export const RecipeUnionResult = createUnionType({
  name: 'RecipeUnionResult',
  types: () => [Recipe, Cook, SaltFish] as const,
});

export enum AuthDirectiveRoleEnum {
  ADMIN,
  REVIEWER,
  USER,
  UNKNOWN,
}

registerEnumType(AuthDirectiveRoleEnum, {
  name: 'AuthDirectiveRoleEnum',
  description: 'For @auth usage only',
});
