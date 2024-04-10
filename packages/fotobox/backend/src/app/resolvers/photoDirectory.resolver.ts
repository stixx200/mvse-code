import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as os from 'os';
import * as path from 'path';

@Resolver('PhotoDirectory')
export class PhotoDirectoryResolver {
  private photoDirectory: string = path.join(os.homedir(), 'fotobox-photos');

  @Query('photoDirectory')
  getPhotoDirectory(): string {
    return this.photoDirectory;
  }

  @Mutation('setPhotoDirectory')
  setPhotoDirectory(@Args() photoDirectory: string) {
    this.photoDirectory = photoDirectory;
  }
}
