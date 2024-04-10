import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('CameraDriver')
export class CameraDriverResolver {
  private cameraDrivers: string[] = ['sony', 'demo'];
  private selectedCameraDriver: string = this.cameraDrivers[0];

  @Query('cameraDrivers')
  getCameraDrivers(): string[] {
    return this.cameraDrivers;
  }

  @Query('selectedCameraDriver')
  getSelectedCameraDriver(): string {
    return this.selectedCameraDriver;
  }

  @Mutation('setSelectedCameraDriver')
  setSelectedCameraDriver(@Args() selectedCameraDriver: string) {
    this.selectedCameraDriver = selectedCameraDriver;
  }
}
