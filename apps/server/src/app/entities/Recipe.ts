import { Field, ObjectType } from 'type-graphql';
import { plainToClass } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { CompanyScale } from '../graphql/Recipe';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  companyId!: number;

  // @Column()
  // name!: string;

  // @Column({ default: CompanyScale.Middle })
  // scale!: CompanyScale;

  // @Column()
  // description!: string;

  // @CreateDateColumn({ comment: "注册时间" })
  // registerDate!: Date;

  // @UpdateDateColumn({ comment: "更新时间" })
  // lastUpdateDate!: Date;
}

// need to use TypeORM Relations
// @Entity()
// export class WorkExperience extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   workExpRecordId!: number;

//   @Column()
//   company!: Company;

//   @Column()
//   isFired!: boolean;

//   @Column()
//   workYears!: number;

//   @CreateDateColumn({ comment: "注册时间" })
//   createDate!: Date;

//   @UpdateDateColumn({ comment: "更新时间" })
//   lastUpdateDate!: Date;
// }
