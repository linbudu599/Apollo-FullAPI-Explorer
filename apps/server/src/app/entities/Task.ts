import { ObjectType } from 'type-graphql';
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
  OneToMany,
} from 'typeorm';
import { TypeormLoader } from 'type-graphql-dataloader';

import Executor from './Executor';
import Substance from './Substance';

import Record from './Record';

import { DifficultyLevel } from '../graphql/Public';
import { ITask, TaskSource, TaskTarget, TaskPriority } from '../graphql/Task';

/**
 * 关联任务
 * 任务回报 -> 任务积分点 + 任务赏金
 */

@ObjectType({ implements: ITask })
@Entity()
export default class Task extends BaseEntity implements ITask {
  // 基本信息
  @PrimaryGeneratedColumn()
  taskId!: number;

  @Column({ unique: true, comment: '任务名称' })
  taskTitle!: string;

  @Column({ default: false, comment: '是否需要清扫者' })
  requireCleaner!: boolean;

  @Column({ default: false, comment: '是否需要心理干预' })
  requirePsychologicalIntervention!: boolean;

  @Column({
    default: TaskPriority.MIDDLE,
    comment: '任务优先级',
  })
  taskPriority!: number;

  @Column({ default: true, comment: '是否允许中途放弃' })
  allowAbort!: boolean;

  @Column({ default: '任务内容待补充', comment: '任务内容' })
  taskContent!: string;

  @Column({ default: false, comment: '任务是否完成' })
  taskAccmplished!: boolean;

  @Column({ default: true, comment: '任务当前是否可接取' })
  taskAvaliable!: boolean;

  @Column({
    default: TaskSource.OTHER,
    comment: '任务来源',
  })
  taskSource!: number;

  @Column({
    default: DifficultyLevel.ROOKIE,
    comment: '任务级别',
  })
  taskLevel!: number;

  // TODO: cash + credit
  @Column({ default: 1000, comment: '任务回报' })
  taskReward!: number;

  @Column({
    default: TaskTarget.OTHER,
    comment: '任务目标',
  })
  taskTarget!: number;

  @Column({ nullable: true, default: 0, comment: '任务完成度评分' })
  taskRate!: number;

  // 任务关联实体
  // 就假设一个任务只会有一个实体出现好了...
  @OneToOne((type) => Substance, (substance) => substance.relatedTask, {
    nullable: true,
    cascade: true,
  })
  taskSubstance!: Substance;

  @RelationId((task: Task) => task.taskSubstance)
  taskSubstanceId?: number;

  // 任务关联指派
  // 在设置ManyToOne处的实体将拥有relationId与外键
  @ManyToOne(() => Executor, (executor) => executor.tasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn() // 对于@ManyToOne是可选的，但对@OneToOne必需
  @TypeormLoader((type) => Executor, (task: Task) => task.assigneeUid)
  assignee!: Executor;

  @RelationId((task: Task) => task.assignee)
  assigneeUid?: number;

  // 记录
  @OneToMany((type) => Record, (record) => record.recordTask, {
    cascade: true,
    nullable: true,
  })
  relatedRecord!: Record[];

  @RelationId((task: Task) => task.relatedRecord)
  relatedRecordId?: number[];

  @CreateDateColumn({ comment: '任务发布时间' })
  publishDate!: Date;

  @UpdateDateColumn({ comment: '任务更新时间' })
  lastUpdateDate!: Date;
}
