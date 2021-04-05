import { ObjectType, Field, ID } from 'type-graphql';

import Item from './Item';

@ObjectType()
export default class User {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field((type) => String, { nullable: true })
  nickName?: string | null;

  @Field((type) => [Item], { nullable: true })
  items?: Item[] | null;
}
