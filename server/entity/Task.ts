import { ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  RelationId,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { TypeormLoader } from "type-graphql-dataloader";

import Executor from "./Executor";
import Substance from "./Substance";

import Record from "./Record";

import { DifficultyLevel } from "../graphql/Public";
import { ITask, TaskSource, TaskTarget, TaskPriority } from "../graphql/Task";

/**
 * 关联任务
 * 任务回报 -> 任务积分点 + 任务赏金
 */

@ObjectType({ implements: ITask })
@Entity()
export default class Task extends BaseEntity implements ITask {
  // 基本信息
  @PrimaryGeneratedColumn()
  taskId!: string;

  @Column({ unique: true, nullable: false, comment: "任务名称" })
  taskTitle!: string;

  @Column({ nullable: false, default: false, comment: "是否需要清扫者" })
  requireCleaner!: boolean;

  @Column({ nullable: false, default: false, comment: "是否需要心理干预" })
  requirePsychologicalIntervention!: boolean;

  @Column({
    nullable: false,
    default: TaskPriority.MIDDLE,
    comment: "任务优先级",
  })
  taskPriority!: TaskPriority;

  @Column({ nullable: false, default: true, comment: "是否允许中途放弃" })
  allowAbort!: boolean;

  @Column({ nullable: false, default: "任务内容待补充", comment: "任务内容" })
  taskContent!: string;

  @Column({ nullable: false, default: false, comment: "任务是否完成" })
  taskAccmplished!: Boolean;

  @Column({ nullable: false, default: true, comment: "任务当前是否可接取" })
  taskAvaliable!: Boolean;

  @Column({ nullable: false, default: TaskSource.OTHER, comment: "任务来源" })
  taskSource!: TaskSource;

  @Column({
    nullable: false,
    default: DifficultyLevel.ROOKIE,
    comment: "任务级别",
  })
  taskLevel!: DifficultyLevel;

  // TODO: cash + credit
  @Column({ nullable: false, default: 1000, comment: "任务回报" })
  taskReward!: number;

  @Column({ nullable: false, default: TaskTarget.OTHER, comment: "任务目标" })
  taskTarget!: TaskTarget;

  @Column({ nullable: true, default: 0, comment: "任务完成度评分" })
  taskRate!: number;

  // 任务关联实体
  // 就假设一个任务只会有一个实体出现好了...
  @OneToOne((type) => Substance, (substance) => substance.relatedTask, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  taskSubstance!: Substance;

  @RelationId((task: Task) => task.taskSubstance)
  taskSubstanceId?: string;

  // 任务关联指派
  @ManyToOne(() => Executor, (executor) => executor.tasks, { nullable: true })
  @JoinColumn({ name: "assigneeUID" })
  @TypeormLoader((type) => Executor, (task: Task) => task.assigneeUID)
  assignee!: Executor;

  @RelationId((task: Task) => task.assignee)
  assigneeUID?: string;

  // 任务关联记录
  @OneToOne((type) => Record, (record) => record.recordTask, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  relatedRecord!: Record;

  @RelationId((task: Task) => task.relatedRecord)
  relatedRecordId?: string;

  @CreateDateColumn({ comment: "任务发布时间" })
  publishDate!: Date;

  @UpdateDateColumn({ comment: "任务更新时间" })
  lastUpdateDate!: Date;
}
