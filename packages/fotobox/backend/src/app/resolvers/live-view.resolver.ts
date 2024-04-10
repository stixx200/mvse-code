import { PubSub } from 'graphql-subscriptions';
import { Resolver, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

@Resolver('liveView')
export class LiveViewResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}

  @Subscription()
  liveView() {
    return this.pubSub.asyncIterator('liveView');
  }
}
