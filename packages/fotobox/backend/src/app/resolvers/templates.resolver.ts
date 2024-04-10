import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Templates')
export class TemplatesResolver {
  @Query('templates')
  templates(parent, directory: string): string[] {
    console.log(`Read templates from '${directory}'`);
    return ['template1'];
  }
}
