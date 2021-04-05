// @ts-nocheck
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Substance {
  @Field((type) => ID, { nullable: false })
  substanceId!: string;

  @Field({ nullable: false })
  substanceName!: string;

  @Field({ nullable: false })
  substanceAlive!: boolean;
}
