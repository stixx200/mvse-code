import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from './graphql.module';

@Module({
  imports: [GraphQLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
