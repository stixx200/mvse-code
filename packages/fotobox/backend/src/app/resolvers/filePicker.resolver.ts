import { Query, Resolver } from '@nestjs/graphql';
import * as os from 'os';
import * as path from 'path';
import { FilePickerMode } from '../graphql';

@Resolver('FilePicker')
export class FilePickerResolver {
  @Query('filePickerResult')
  filePickerResult(
    parent,
    args: { mode: FilePickerMode; defaultPath?: string }
  ): string {
    console.log(
      `Get FilePicker result with: ${args.mode} and '${args.defaultPath}'`
    );
    return path.join(os.homedir(), 'fotobox-photos');
  }
}
