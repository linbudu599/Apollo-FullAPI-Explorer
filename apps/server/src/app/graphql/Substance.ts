/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  ClassType,
  Field,
  ID,
  InputType,
  InterfaceType,
  ObjectType,
  registerEnumType,
  Int,
} from 'type-graphql';

import Task from '../entities/Task';
import Record from '../entities/Record';

import { DifficultyLevel } from './Public';
import { ITask } from './Task';

enum CthulhuType {
  OUTER_GODS,
  ELDER_GODS,
  OLD_DOMINATOR,
}

registerEnumType(CthulhuType, {
  name: 'CthulhuType',
  description: 'Known Cthulhu Type',
});

@InterfaceType({ description: 'Substance Interface Type' })
export abstract class ISubstance {
  @Field((type) => ID)
  substanceId!: number;

  @Field()
  substanceName!: string;

  @Field()
  substanceAlive!: boolean;

  @Field()
  substanceDesc!: string;

  @Field()
  substanceIssues!: string;

  @Field(() => DifficultyLevel)
  substanceLevel!: string;

  @Field()
  asylumed!: boolean;

  @Field((type) => Task, { nullable: true })
  relatedTask?: ITask;

  @Field((type) => [Record]!, { nullable: true })
  relatedRecord!: Record[];

  @Field((type) => Date)
  substanceAppearDate!: Date;

  @Field((type) => Date)
  lastActiveDate!: Date;
}

// TODO: Validation
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class SubstanceInput implements Partial<ISubstance> {
  @Field({ nullable: true })
  substanceName?: string;

  @Field({ nullable: true })
  substanceAlive?: boolean;

  @Field({ nullable: true })
  substanceIssues?: string;

  @Field((type) => DifficultyLevel, { nullable: true })
  substanceLevel?: string;

  @Field({ nullable: true })
  asylumed?: boolean;
}

export const QuerySubstanceMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class QueryInput extends BaseClass {}

  return QueryInput;
};

export const CreateSubstanceMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class CreateInput extends BaseClass {
    @Field()
    substanceName!: string;

    // @Field((type) => DifficultyLevel, )
    // substanceLevel!: DifficultyLevel;
  }

  return CreateInput;
};

export const UpdateSubstanceMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class UpdateInput extends BaseClass {
    @Field((type) => Int)
    substanceId!: number;
  }

  return UpdateInput;
};

@InputType({ description: 'Substance Create Input' })
export class SubstanceQueryInput extends QuerySubstanceMixin(SubstanceInput) {}

@InputType({ description: 'Substance Create Input' })
export class SubstanceCreateInput extends CreateSubstanceMixin(
  SubstanceInput
) {}

@InputType({ description: 'Substance Update Input' })
export class SubstanceUpdateInput extends UpdateSubstanceMixin(
  SubstanceInput
) {}

@InputType({ description: 'Substance Relations Input' })
export class SubstanceRelationsInput {
  @Field({ nullable: true })
  joinTask: boolean = false;

  @Field({ nullable: true })
  joinAssignee: boolean = false;

  @Field({ nullable: true })
  joinRecord: boolean = false;
}

interface ISubstanceRelationOptions {
  joinTask?: boolean;
  joinAssignee?: boolean;
  joinRecord?: boolean;
}
export type SubstanceRelation = 'relatedRecord' | 'relatedTask' | 'assignee';

export const getSubstanceRelations = ({
  joinTask = false,
  joinAssignee = false,
  joinRecord = false,
}: ISubstanceRelationOptions): SubstanceRelation[] => {
  const relations: SubstanceRelation[] = [];
  joinTask ? relations.push('relatedTask') : void 0;
  joinAssignee ? relations.push('assignee') : void 0;
  joinRecord ? relations.push('relatedRecord') : void 0;
  return relations;
};
