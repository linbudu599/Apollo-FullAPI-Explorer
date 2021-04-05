import { ObjectType } from 'type-graphql';

import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';

import { IRecord } from '../graphql/Record';

import Task from './Task';
import Executor from './Executor';
import Substance from './Substance';
import Account from './Account';

@ObjectType({ implements: IRecord })
@Entity()
export default class Record extends BaseEntity implements IRecord {
  @PrimaryGeneratedColumn()
  recordId!: number;

  @ManyToOne((type) => Task, (task: Task) => task.relatedRecord, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'recordTaskId' })
  recordTask!: Task;

  @ManyToOne((type) => Account, (account: Account) => account.relatedRecord, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'recordAccountId' })
  recordAccount!: Account;

  @ManyToOne(
    (type) => Substance,
    (substance: Substance) => substance.relatedRecord,
    {
      nullable: true,
      onDelete: 'SET NULL',
    }
  )
  @JoinColumn({ name: 'recordSubstanceId' })
  recordSubstance!: Substance;

  @ManyToOne(
    (type) => Executor,
    (executor: Executor) => executor.relatedRecord,
    {
      nullable: true,
      onDelete: 'SET NULL',
    }
  )
  @JoinColumn({ name: 'recordExecutorId' })
  recordExecutor!: Executor;

  @CreateDateColumn({ comment: '记录创建时间' })
  createDate!: Date;

  @UpdateDateColumn({ comment: '记录更新时间' })
  lastUpdateDate!: Date;
}
