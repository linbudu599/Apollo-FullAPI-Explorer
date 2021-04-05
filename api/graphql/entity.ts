// @ts-nocheck
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export default class Substance extends BaseEntity {
  @PrimaryGeneratedColumn()
  substanceId!: string;

  @Column({ unique: true, nullable: false, comment: '实体命名' })
  substanceName!: string;

  @Column({ nullable: false, default: true, comment: '实体是否存活' })
  substanceAlive!: boolean;
}
