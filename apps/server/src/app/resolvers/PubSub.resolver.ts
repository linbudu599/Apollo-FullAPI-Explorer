import { PubSubEngine } from 'graphql-subscriptions';

import {
  Resolver,
  Query,
  Mutation,
  Arg,
  PubSub,
  Publisher,
  Subscription,
  Root,
  ResolverFilterData,
} from 'type-graphql';

import Notification, {
  NotificationPayload,
  SUBSCRIPTION_MSG,
} from '../graphql/PubSub';

// Mutation -> Trigger Subscription -> Push to Client

@Resolver((of) => Notification)
export default class PubSubResolver {
  private autoIncrePointer = 0;

  @Query(() => Date)
  currentDate(): Date {
    return new Date();
  }

  // 自定义载荷中的message
  @Mutation(() => Boolean)
  async pubSubMutation(
    @PubSub() pubSub: PubSubEngine,
    @Arg('message', { nullable: true }) message?: string
  ): Promise<boolean> {
    const payload: NotificationPayload = {
      id: ++this.autoIncrePointer,
      message,
    };
    await pubSub.publish(SUBSCRIPTION_MSG.NOTIFICATIONS, payload);
    return true;
  }

  @Mutation((returns) => Boolean)
  async publisherMutation(
    @PubSub(SUBSCRIPTION_MSG.NOTIFICATIONS)
    publish: Publisher<NotificationPayload>,
    @Arg('message', { nullable: true }) message?: string
  ): Promise<boolean> {
    await publish({ id: ++this.autoIncrePointer, message });
    return true;
  }

  @Subscription({ topics: SUBSCRIPTION_MSG.NOTIFICATIONS })
  normalSubscription(
    @Root() { id, message }: NotificationPayload
  ): Notification {
    return { id, message, date: new Date() };
  }

  @Subscription(() => Notification, {
    // 订阅此话题
    topics: SUBSCRIPTION_MSG.NOTIFICATIONS,
    // 只在符合条件时推送信息
    filter: ({ payload }: ResolverFilterData<NotificationPayload>) =>
      payload.id % 2 === 0,
  })
  subscriptionWithFilter(@Root() { id, message }: NotificationPayload) {
    const newNotification: Notification = { id, message, date: new Date() };
    return newNotification;
  }

  // 自定义发布消息类型
  @Mutation((returns) => Boolean)
  async pubSubMutationToDynamicTopic(
    @PubSub() pubSub: PubSubEngine,
    @Arg('topic') topic: string,
    @Arg('message', { nullable: true }) message?: string
  ): Promise<boolean> {
    const payload: NotificationPayload = {
      id: ++this.autoIncrePointer,
      message,
    };
    await pubSub.publish(topic, payload);
    return true;
  }

  // 推送动态类型的消息类型
  @Subscription({
    topics: ({ args }) => args.topic,
  })
  subscriptionWithFilterToDynamicTopic(
    @Arg('topic') topic: string,
    @Root() { id, message }: NotificationPayload
  ): Notification {
    return { id, message, date: new Date() };
  }
}
