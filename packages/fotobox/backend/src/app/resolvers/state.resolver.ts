import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

let appStarted = false;

interface ApplicationSettings {
  usePrinter: boolean;
  selectedCameraDriver: string;
  photoDir: string;
  shutterTimeout: number;
}

@Resolver('State')
export class StateResolver {
  @Query('state')
  state(): { appStarted: boolean } {
    return { appStarted };
  }

  @Mutation('startApplication')
  startApplication(@Args() settings: ApplicationSettings) {
    console.log('app started with settings', settings);
    appStarted = true;
    return { appStarted };
  }
}
