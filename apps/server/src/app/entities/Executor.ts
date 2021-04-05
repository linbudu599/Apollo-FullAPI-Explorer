import { Extensions, Field, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from '../lib/dataloader';
import { plainToClass } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  RelationId,
  OneToOne,
} from 'typeorm';

import { IExecutor, JOB, IExecutorDesc, REGION } from '../graphql/Executor';
import { DifficultyLevel } from '../graphql/Public';

import Task from './Task';
import Record from './Record';

// import { LogExtension } from "../extensions/LogExtension";

@ObjectType({ implements: IExecutorDesc })
export class ExecutorDesc extends BaseEntity implements IExecutorDesc {
  @Column({ default: DifficultyLevel.ROOKIE, nullable: true })
  level!: DifficultyLevel;

  @Column({ default: 0, nullable: true })
  successRate!: number;

  @Column({ default: 0, nullable: true })
  satisfaction!: number;
}

const EXECUTOR_DESC_DEFAULT = plainToClass(ExecutorDesc, {
  level: DifficultyLevel.ROOKIE,
  successRate: 0,
  satisfaction: 0,
});

@ObjectType({ implements: IExecutor })
@Entity()
export default class Executor extends BaseEntity implements IExecutor {
  // 执行者基本信息
  @PrimaryGeneratedColumn()
  uid!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ default: 10 })
  age!: number;

  @Column({ default: JOB.FE })
  job!: string;

  @Column({ default: false })
  avaliable!: boolean;

  @Column({ default: false })
  isFool!: boolean;

  @Column({ default: JSON.stringify(EXECUTOR_DESC_DEFAULT) })
  // @Extension needs to be used with @Field
  @Extensions({ info: 'Executor.desc Field' })
  @Field()
  desc!: string;

  @Column({ default: REGION.OTHER })
  region!: string;

  @Extensions({ complexity: 1 })
  // @LogExtension({ message: "我直接好家伙" })
  @Field((type) => Int)
  spAgeField?: number;

  // 任务
  @OneToMany((type) => Task, (task) => task.assignee, {
    cascade: true,
    nullable: true,
  })
  @TypeormLoader((type) => Task, (executor: Executor) => executor.taskIds)
  tasks?: Task[];

  @RelationId((executor: Executor) => executor.tasks)
  taskIds?: number[];

  // 记录
  @OneToMany((type) => Record, (record) => record.recordExecutor, {
    cascade: true,
    nullable: true,
  })
  relatedRecord!: Record[];

  @RelationId((executor: Executor) => executor.relatedRecord)
  relatedRecordId?: number[];

  @CreateDateColumn()
  joinDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;
}
