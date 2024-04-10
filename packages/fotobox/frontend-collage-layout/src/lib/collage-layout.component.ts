import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { CollageImageComponent } from './collage-image/collage-image.component';
import { UiSharedCountdownComponent } from '@mvse/ui-shared/countdown';
import { UiSharedMessageStripeComponent } from '@mvse/ui-shared/message-stripe';
import {
  PhotoviewConfiguration,
  UiSharedPhotoViewComponent,
} from '@mvse/ui-shared/photo-view';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { selectMainConfiguration } from '../../../frontend/src/app/store/mainConfiguration.selector';
import { Collage } from '@mvse/fotobox/frontend-data-access';

export interface CollageLayoutOptions {
  showExitButton: boolean;
  templateId: string;
}

@Component({
  selector: 'mvse-fotobox-frontend-collage-layout',
  templateUrl: './collage-layout.component.html',
  styleUrls: ['./collage-layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    UiSharedCountdownComponent,
    UiSharedMessageStripeComponent,
    UiSharedPhotoViewComponent,
    CollageImageComponent,
  ],
})
export class FotoboxFrontendCollageLayoutComponent
  implements OnInit, OnDestroy
{
  photoviewConfiguration: PhotoviewConfiguration = {};
  nextDialog: PhotoviewConfiguration = {
    title: '',
    buttons: [
      {
        text: 'NEXT',
        icon: '',
        callback: () => this.exit(),
      },
    ],
  };
  printDialog: PhotoviewConfiguration = {
    title: 'PRINT_QUESTION',
    buttons: [
      {
        text: 'YES',
        icon: '',
        callback: () => this.print(),
      },
      {
        text: 'NO',
        icon: '',
        callback: () => this.exit(),
      },
    ],
  };
  @Input('options') readonly options!: CollageLayoutOptions;
  @Output('onTriggerPrinter') printEvent = new EventEmitter<string>();
  @Output('onResetCollage') resetCollage = new EventEmitter<void>();
  @ViewChild('imageComponent') collageComponent!: CollageImageComponent;
  @ViewChild('countdown') countdown!: UiSharedCountdownComponent;
  @Output('onTriggerCamera') triggerCamera = new EventEmitter<void>();

  mainConfigurationState = this.store.select(selectMainConfiguration);
  timeout = this.mainConfigurationState.pipe(
    map((state) => state.shutterTimeout)
  );
  photos: string[] = [];
  currentPhoto: string | null = null;
  usePhotoDialog: PhotoviewConfiguration = {
    title: 'USE_QUESTION',
    buttons: [
      {
        text: 'YES',
        icon: '',
        callback: () => this.useCurrentPhoto(),
      },
      {
        text: 'NO',
        icon: '',
        callback: () => (this.currentPhoto = null),
      },
    ],
  };
  topMessage = 'LAYOUTS.READY_TAKE_PICTURE';
  bottomMessage = 'LAYOUTS.ABORT';

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.reset();
  }

  ngOnDestroy() {
    this.collageComponent.reset();
  }

  takePicture() {
    if (!this.currentPhoto) {
      console.log('Trigger picture creation');
      this.countdown.start();
    }
  }

  print() {
    this.printEvent.emit(this.currentPhoto!);
    // exit collage view after printing
    this.exit();
  }

  onCollageDone(collage: Collage) {
    this.mainConfigurationState.pipe(take(1)).subscribe(({ usePrinter }) => {
      if (usePrinter) {
        this.photoviewConfiguration = this.printDialog;
      } else {
        this.photoviewConfiguration = this.nextDialog;
      }
      this.currentPhoto = collage.url;
    });
  }

  @Input('photoUrl') set photoUrl(photoUrl: string) {
    this.currentPhoto = photoUrl;
    if (this.collageComponent.previewAvailable) {
      this.photoviewConfiguration = this.usePhotoDialog;
    } else {
      this.useCurrentPhoto();
    }
  }

  private useCurrentPhoto() {
    this.collageComponent.addPhoto(this.currentPhoto!);
    this.currentPhoto = null;
  }

  reset() {
    this.photos = [];
    this.currentPhoto = null;
    this.resetCollage.emit();
    this.countdown?.abort();
  }

  exit() {
    this.reset();
    this.router.navigate(['/home']);
  }
}
