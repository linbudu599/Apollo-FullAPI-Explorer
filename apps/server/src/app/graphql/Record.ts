/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, InterfaceType } from 'type-graphql';

import Task from '../entities/Task';
import Executor from '../entities/Executor';
import Account from '../entities/Account';
import Substance from '../entities/Substance';

@InterfaceType({ description: 'Record Interface Type' })
export abstract class IRecord {
  @Field((type) => ID)
  recordId!: number;

  @Field((type) => Task, { nullable: true })
  recordTask!: Task;

  @Field((type) => Account, { nullable: true })
  recordAccount!: Account;

  @Field((type) => Executor, { nullable: true })
  recordExecutor!: Executor;

  @Field((type) => Substance, { nullable: true })
  recordSubstance!: Substance;

  @Field((type) => Date)
  createDate!: Date;

  @Field((type) => Date)
  lastUpdateDate!: Date;
}

@InputType({ description: 'Record Relations Input' })
export class RecordRelationsInput {
  @Field({ nullable: true })
  joinTask: boolean = true;

  @Field({ nullable: true })
  joinAccount: boolean = true;

  @Field({ nullable: true })
  joinExecutor: boolean = true;

  @Field({ nullable: true })
  joinSubstance: boolean = true;
}

interface IRecordRelationOptions {
  joinTask?: boolean;
  joinAccount?: boolean;
  joinExecutor?: boolean;
  joinSubstance?: boolean;
}
export type RecordRelations =
  | 'recordTask'
  | 'recordAccount'
  | 'recordExecutor'
  | 'recordSubstance';

export const getRecordRelations = ({
  joinTask = true,
  joinAccount = true,
  joinExecutor = true,
  joinSubstance = true,
}: IRecordRelationOptions): RecordRelations[] => {
  const relations: RecordRelations[] = [];

  joinTask ? relations.push('recordTask') : void 0;
  joinAccount ? relations.push('recordAccount') : void 0;
  joinExecutor ? relations.push('recordExecutor') : void 0;
  joinSubstance ? relations.push('recordSubstance') : void 0;

  return relations;
};
