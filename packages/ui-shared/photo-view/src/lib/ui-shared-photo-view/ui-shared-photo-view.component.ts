import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'lodash';
import { TranslateModule } from '@ngx-translate/core';
import { UiSharedMessageStripeComponent } from '@mvse/ui-shared/message-stripe';

export interface PhotoviewConfiguration {
  title?: string;
  buttons?: {
    text: string;
    callback: Function;
    icon: string;
  }[];
}

@Component({
  selector: 'mvse-ui-shared-photo-view',
  standalone: true,
  imports: [CommonModule, TranslateModule, UiSharedMessageStripeComponent],
  templateUrl: './ui-shared-photo-view.component.html',
  styleUrls: ['./ui-shared-photo-view.component.css'],
})
export class UiSharedPhotoViewComponent implements AfterViewInit {
  @Input() config!: PhotoviewConfiguration;
  @ViewChild('photo') photoChild?: ElementRef;

  private photo?: string | SafeResourceUrl;

  constructor(private renderer: Renderer2) {}

  @Input()
  set photoUrl(photo: string | SafeResourceUrl) {
    this.photo = photo;
    this.showPhoto();
  }

  ngAfterViewInit() {
    this.showPhoto();
  }

  private showPhoto() {
    if (!_.isString(this.photo) || !this.photoChild) {
      return;
    }
    this.renderer.setStyle(
      this.photoChild.nativeElement,
      `background`,
      `url(photo://${this.photo}) center center no-repeat`
    );
  }
}
