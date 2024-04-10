import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Collage } from '../graphql';

@Resolver('Collage')
export class CollageResolver {
  private collage: Collage = {
    templateId: 'template',
    done: false,
    photoCount: 2,
    photos: [],
    url: '',
  };

  @Query()
  getCollage(): Collage {
    return this.collage;
  }

  @Mutation()
  initCollage(@Args() templateId: string) {
    this.collage = {
      templateId: templateId,
      done: false,
      photoCount: 2,
      photos: [],
      url: '',
    };
    return this.collage;
  }

  @Mutation()
  resetCollage() {
    this.collage = {
      templateId: 'temp',
      done: false,
      photoCount: 2,
      photos: [],
      url: '',
    };
    return this.collage;
  }

  @Mutation()
  addPhotoToCollage(@Args() photo: string) {
    this.collage.photos.push(photo);
    return this.collage;
  }
}
