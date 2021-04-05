/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Field,
  InputType,
  ID,
  registerEnumType,
  InterfaceType,
  ClassType,
  ObjectType,
  Int,
} from 'type-graphql';
import {
  Length,
  IsString,
  IsNumber,
  IsOptional,
  Max,
  Min,
  IsPositive,
  IsEnum,
} from 'class-validator';

import Executor from '../entities/Executor';
import Substance from '../entities/Substance';
import Record from '../entities/Record';

import { IExecutor } from './Executor';
import { DifficultyLevel } from './Public';

export enum TaskSource {
  GOV,
  MERCHANT,
  SCP,
  PERSONAL,
  OTHER,
}

export enum TaskTarget {
  HUMAN,
  AI,
  WITCHER,
  SCP_ITEM,
  ALIEN,
  CTHULHU,
  OTHER,
}

export enum TaskPriority {
  LOW,
  MIDDLE,
  HIGH,
  EMERGENCY,
  DOMINATOR,
}

registerEnumType(TaskSource, {
  name: 'TaskSource',
  description: 'Task Source',
});

registerEnumType(TaskTarget, {
  name: 'TaskTarget',
  description: 'Task Against',
});

registerEnumType(TaskPriority, {
  name: 'TaskPriority',
  description: 'Task Priority',
});

@InterfaceType({ description: 'Task Interface Type' })
export abstract class ITask {
  @Field((type) => ID)
  taskId!: number;

  @Field()
  taskTitle!: string;

  @Field()
  requireCleaner!: boolean;

  @Field()
  requirePsychologicalIntervention!: boolean;

  @Field((type) => Executor, { nullable: true })
  assignee!: IExecutor;

  @Field()
  taskContent!: string;

  @Field()
  allowAbort!: boolean;

  @Field((type) => TaskSource)
  taskSource!: number;

  @Field((type) => DifficultyLevel)
  taskLevel!: number;

  @Field()
  taskAccmplished!: boolean;

  @Field()
  taskAvaliable!: boolean;

  @Field((type) => Int)
  taskReward!: number;

  @Field((type) => Int)
  taskRate!: number;

  @Field((type) => TaskTarget)
  taskTarget!: number;

  @Field((type) => Substance, { nullable: true })
  taskSubstance!: Substance;

  @Field((type) => [Record]!, { nullable: true })
  relatedRecord!: Record[];

  @Field()
  publishDate!: Date;

  @Field()
  lastUpdateDate!: Date;
}

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class TaskInput implements Partial<ITask> {
  @Field({ nullable: true })
  @Length(5, 10)
  @IsString()
  taskTitle?: string;

  @Field({ nullable: true })
  @IsOptional()
  requireCleaner?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  requirePsychologicalIntervention?: boolean;

  @Field({ nullable: true })
  @Length(2, 100)
  @IsString()
  @IsOptional()
  taskContent?: string;

  @Field({ nullable: true })
  @IsOptional()
  allowAbort?: boolean;

  @Field((type) => TaskSource, { nullable: true })
  @IsOptional()
  @IsEnum(TaskSource)
  taskSource?: number;

  @Field((type) => DifficultyLevel, { nullable: true })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  taskLevel?: number;

  @Field({ nullable: true })
  @IsOptional()
  taskAvaliable?: boolean;

  @Field((type) => Int, { nullable: true })
  @Max(1000)
  @Min(0)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  taskReward?: number;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  taskRate?: number;

  @Field((type) => TaskTarget, { nullable: true })
  @IsOptional()
  @IsEnum(TaskTarget)
  taskTarget?: number;
}

export const QueryTaskMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class QueryInput extends BaseClass {}

  return QueryInput;
};

export const PublishTaskMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class PublishInput extends BaseClass {
    @Field({ nullable: false })
    @Length(5, 20)
    @IsString()
    taskTitle!: string;

    @Field((type) => ID, { nullable: false })
    // @IsPositive()
    // @IsNumber()
    substanceId!: number;
  }

  return PublishInput;
};

export const UpdateTaskMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class UpdateInput extends BaseClass {
    @Field((type) => Int, { nullable: false })
    @IsPositive()
    @Length(1, 10)
    @IsNumber()
    taskId!: number;

    @Field((type) => Int, { nullable: true })
    @Max(10)
    @Min(0)
    @IsNumber()
    @IsPositive()
    @IsOptional()
    taskRate?: number;
  }

  return UpdateInput;
};

@InputType({ description: 'Task Query Input' })
export class TaskQueryInput extends QueryTaskMixin(TaskInput) {}

@InputType({ description: 'Task Create Input' })
export class TaskCreateInput extends PublishTaskMixin(TaskInput) {}

@InputType({ description: 'Task Update Input' })
export class TaskUpdateInput extends UpdateTaskMixin(TaskInput) {}

@InputType({ description: 'Task Relations Input' })
export class TaskRelationsInput {
  @Field({ nullable: true })
  joinRecord: boolean = false;

  @Field({ nullable: true })
  joinAssignee: boolean = false;

  @Field({ nullable: true })
  joinSubstance: boolean = false;
}

interface ITaskRelationOptions {
  joinRecord?: boolean;
  joinAssignee?: boolean;
  joinSubstance?: boolean;
}
export type TaskRelation = 'assignee' | 'taskSubstance' | 'relatedRecord';

export const getTaskRelations = ({
  joinAssignee = false,
  joinSubstance = false,
  joinRecord = false,
}: ITaskRelationOptions): TaskRelation[] => {
  const relations: TaskRelation[] = [];
  joinAssignee ? relations.push('assignee') : void 0;
  joinSubstance ? relations.push('taskSubstance') : void 0;
  joinRecord ? relations.push('relatedRecord') : void 0;
  return relations;
};
