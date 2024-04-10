import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('UsePrinter')
export class UsePrinterResolver {
  private usePrinter: boolean = true;

  @Query('usePrinter')
  getUsePrinter(): boolean {
    return this.usePrinter;
  }

  @Mutation('setUsePrinter')
  setUsePrinter(@Args() usePrinter: boolean) {
    this.usePrinter = usePrinter;
  }
}
