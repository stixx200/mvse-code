import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import {
  PhotoviewConfiguration,
  UiSharedPhotoViewComponent,
} from '@mvse/ui-shared/photo-view';
import { UiSharedCountdownComponent } from '@mvse/ui-shared/countdown';
import { selectMainConfiguration } from '../../../frontend/src/app/store/mainConfiguration.selector';
import { TranslateModule } from '@ngx-translate/core';
import { UiSharedMessageStripeComponent } from '@mvse/ui-shared/message-stripe';

export interface SingleLayoutOptions {
  showExitButton: boolean;
}

@Component({
  selector: 'mvse-fotobox-frontend-single-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    RouterModule,
    TranslateModule,
    UiSharedCountdownComponent,
    UiSharedMessageStripeComponent,
    UiSharedPhotoViewComponent,
  ],
  templateUrl: './fotobox-frontend-single-layout.component.html',
  styleUrls: ['./fotobox-frontend-single-layout.component.css'],
})
export class FotoboxFrontendSingleLayoutComponent implements OnInit {
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

  @Input('options') readonly options!: SingleLayoutOptions;
  @Output('onTriggerPrinter') printEvent = new EventEmitter<string>();
  @Output('onTriggerCamera') triggerCamera = new EventEmitter<void>();
  @ViewChild('countdown') countdown!: UiSharedCountdownComponent;

  currentPhoto: string | null = null;
  mainConfigurationState = this.store.select(selectMainConfiguration);
  timeout = this.mainConfigurationState.pipe(
    map((state) => state.shutterTimeout)
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const photo = this.route.snapshot.paramMap.get('photo');
    if (photo) this.photoUrl = photo;
  }

  @Input('photoUrl') set photoUrl(photo: string) {
    let usePrinter = false;
    this.mainConfigurationState
      .pipe(take(1))
      .subscribe((state) => (usePrinter = state.usePrinter));
    console.log(`showing new photo: ${photo}`);
    if (usePrinter) {
      this.photoviewConfiguration = this.printDialog;
    } else {
      this.photoviewConfiguration = this.nextDialog;
    }
    this.currentPhoto = photo;
  }

  takePicture() {
    if (!this.currentPhoto) {
      console.log('Trigger picture creation');
      this.countdown.start();
    }
  }

  print() {
    this.printEvent.emit(this.currentPhoto!);
    this.exit();
  }

  reset() {
    this.currentPhoto = null;
    this.countdown?.abort();
  }

  exit() {
    this.reset();
    this.router.navigate(['/home']);
  }
}
