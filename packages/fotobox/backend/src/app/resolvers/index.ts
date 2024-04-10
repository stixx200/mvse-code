import { CameraDriverResolver } from './cameraDriver.resolver';
import { PhotoDirectoryResolver } from './photoDirectory.resolver';
import { ShutterTimeoutResolver } from './shutterTimeout.resolver';
import { UsePrinterResolver } from './usePrinter.resolver';
import { FilePickerResolver } from './filePicker.resolver';
import { StateResolver } from './state.resolver';

export const resolvers = [
  CameraDriverResolver,
  PhotoDirectoryResolver,
  ShutterTimeoutResolver,
  UsePrinterResolver,
  FilePickerResolver,
  StateResolver,
];
