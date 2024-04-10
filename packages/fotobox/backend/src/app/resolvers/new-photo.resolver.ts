import { PubSub } from 'graphql-subscriptions';
import { Resolver, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

@Resolver('newPhoto')
export class NewPhotoResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}

  @Subscription()
  newPhoto() {
    return this.pubSub.asyncIterator('newPhoto');
  }
}
