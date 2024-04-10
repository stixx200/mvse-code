import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('ShutterTimeout')
export class ShutterTimeoutResolver {
  private shutterTimeout: number = 5;

  @Query('shutterTimeout')
  getShutterTimeout(): number {
    return this.shutterTimeout;
  }

  @Mutation('setShutterTimeout')
  setShutterTimeout(@Args() timeout: number) {
    this.shutterTimeout = timeout;
  }
}
