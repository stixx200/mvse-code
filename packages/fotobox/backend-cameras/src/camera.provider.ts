import { CameraInitConfiguration, CameraInterface } from './camera.interface';
import { DemoCamera } from './demo';
import { SonyCamera } from './sony';
import { Injectable } from '@nestjs/common';

export type CameraProviderInitConfig = CameraInitConfiguration & {
  cameraDriver: string;
};

const cameras = {
  sony: SonyCamera,
  demo: DemoCamera,
};

const getCamera = (cameraDriver: string): CameraInterface => {
  if (!cameras[cameraDriver]) {
    throw new Error(`Driver '${cameraDriver}' not available.`);
  }
  return new cameras[cameraDriver]();
};

@Injectable()
export class CameraProvider {
  private camera: CameraInterface = null;

  static getCameraDriverNames() {
    return Object.keys(cameras);
  }

  async init(config: CameraProviderInitConfig) {
    this.camera = getCamera(config.cameraDriver);
    await this.camera.init(config);
  }

  async deinit() {
    await this.camera?.deinit();
    this.camera = null;
  }

  observeLiveView() {
    return this.camera?.observeLiveView();
  }

  observePictures() {
    return this.camera?.observePictures();
  }

  takePicture() {
    this.camera?.takePicture();
  }
}
