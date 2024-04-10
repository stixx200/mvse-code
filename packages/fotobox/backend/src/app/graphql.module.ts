import { Module } from '@nestjs/common';
import { GraphQLModule as GraphQLModuleNest } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { resolvers } from './resolvers';
import * as path from 'path';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    GraphQLModuleNest.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [
    ...resolvers,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [GraphQLModuleNest],
})
export class GraphQLModule {}
