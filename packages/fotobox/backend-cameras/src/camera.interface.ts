import { Observable } from 'rxjs';

export interface CameraInitConfiguration {
  photoDir: string;
  wifiControl: boolean;
  sonyPassword: string;
}

export interface CameraInterface {
  init(initConfig: CameraInitConfiguration): Promise<void>;

  deinit(): Promise<void>;

  takePicture(): void;

  observeLiveView(): Observable<Buffer>;

  stopLiveView(): void;

  observePictures(): Observable<string>;
}
