import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default class Notification {
  @Field((type) => ID)
  id!: number;

  @Field({ nullable: true })
  message?: string;

  @Field((type) => Date)
  date!: Date;
}

export interface NotificationPayload {
  id: number;
  message?: string;
}

// TODO: more topics for subscriptions
export enum SUBSCRIPTION_MSG {
  NOTIFICATIONS = 'NOTIFICATIONS',
}
