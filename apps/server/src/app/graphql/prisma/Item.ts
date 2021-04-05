import { ObjectType, Field, registerEnumType, ID, Int } from 'type-graphql';

import User from './User';

export enum ItemType {
  LIFE = 'LIFE',
  FEATURE = 'FEATURE',
  BUG = 'BUG',
  IDEA = 'IDEA',
}
registerEnumType(ItemType, {
  name: 'ItemType',
  description: 'Todo Item Type',
});

@ObjectType()
export default class TodoItem {
  @Field((type) => ID)
  id!: number;

  @Field()
  title!: string;

  // 对于可能为nul的原始类型的特殊处理
  @Field((type) => String, { nullable: true })
  content?: string | null;

  // @Field()
  // 由于SQLite不支持enum, 如果这里使用enum会导致生成的Prisma Client类型不匹配
  // type!: string;

  @Field((type) => User, { nullable: true })
  owner?: User | null;

  @Field((type) => Int, { nullable: true })
  ownerId?: number | null;

  @Field((type) => Date)
  createdAt!: Date;

  @Field((type) => Date)
  updatedAt!: Date;
}
