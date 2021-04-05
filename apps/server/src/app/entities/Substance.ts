import { ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  RelationId,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Task from './Task';
import Record from './Record';

import { DifficultyLevel } from '../graphql/Public';
import { ISubstance } from '../graphql/Substance';

@ObjectType({ implements: ISubstance })
@Entity()
export default class Substance extends BaseEntity implements ISubstance {
  // 实体基本信息
  @PrimaryGeneratedColumn()
  substanceId!: number;

  @Column({ unique: true, comment: '实体命名' })
  substanceName!: string;

  @Column({ default: true, comment: '实体是否存活' })
  substanceAlive!: boolean;

  @Column({ default: '实体描述未收集', comment: '实体描述' })
  substanceDesc!: string;

  @Column({ default: '实体事件未收集' })
  substanceIssues!: string;

  @Column({
    default: DifficultyLevel.ROOKIE,
    comment: '实体威胁级别',
  })
  substanceLevel!: string;

  @Column({ default: false, comment: '是否已收收容' })
  asylumed!: boolean;

  // 实体关联任务
  @OneToOne(() => Task, (task) => task.taskSubstance, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'relatedTaskId' })
  relatedTask!: Task;

  @RelationId((substance: Substance) => substance.relatedTask)
  relatedTaskId?: string;

  // 实体关联记录
  @OneToMany((type) => Record, (record) => record.recordSubstance, {
    cascade: true,
    nullable: true,
  })
  relatedRecord!: Record[];

  @RelationId((substance: Substance) => substance.relatedRecord)
  relatedRecordId?: number[];

  @CreateDateColumn({ comment: '实体首次出现时间' })
  substanceAppearDate!: Date;

  @UpdateDateColumn({ comment: '实体上一次出现时间' })
  lastActiveDate!: Date;
}
