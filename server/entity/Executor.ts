import { Extensions, Field, Int, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { plainToClass } from "class-transformer";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  RelationId,
  JoinColumn,
  OneToOne,
} from "typeorm";

import { IExecutor, JOB, IExecutorDesc, REGION } from "../graphql/Executor";
import { DifficultyLevel } from "../graphql/Public";

import Task from "./Task";
import Record from "./Record";

import { LogExtension } from "../extensions/LogExtension";

@ObjectType({ implements: IExecutorDesc })
export class ExecutorDesc extends BaseEntity implements IExecutorDesc {
  @Column({ default: DifficultyLevel.ROOKIE, nullable: true })
  level!: DifficultyLevel;

  @Column({ default: 0, nullable: true })
  successRate!: number;

  @Column({ default: 0, nullable: true })
  satisfaction!: number;
}

const Executor_DESC_DEFAULT = plainToClass(ExecutorDesc, {
  level: DifficultyLevel.ROOKIE,
  successRate: 0,
  satisfaction: 0,
});

@ObjectType({ implements: IExecutor })
@Entity()
export default class Executor extends BaseEntity implements IExecutor {
  // 执行者基本信息
  @PrimaryGeneratedColumn()
  uid!: string;

  @Column({ unique: true, nullable: false })
  name!: string;

  @Column({ default: 0, nullable: false })
  age!: number;

  @Column({ default: JOB.FE })
  job!: JOB;

  @Column({ default: false, nullable: false })
  isFool!: boolean;

  @Column({ default: JSON.stringify(Executor_DESC_DEFAULT) })
  // @Extension needs to be used with @Field
  @Extensions({ info: "Executor.desc Field" })
  @Field()
  desc!: string;

  @Column({ default: REGION.OTHER, nullable: false })
  region!: REGION;

  @Extensions({ complexity: 1 })
  @LogExtension({ message: "我直接好家伙" })
  @Field((type) => Int)
  spAgeField?: number;

  // 任务
  @OneToMany(() => Task, (task) => task.assignee)
  @TypeormLoader((type) => Executor, (Executor: Executor) => Executor.taskIds)
  tasks?: Task[];

  @RelationId((Executor: Executor) => Executor.tasks)
  taskIds?: string[];

  // 关联记录
  @OneToOne((type) => Record, (record) => record.recordExecutor, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  relatedRecord!: Record;

  @RelationId((executor: Executor) => executor.relatedRecord)
  relatedRecordId?: string;

  @CreateDateColumn()
  joinDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;
}