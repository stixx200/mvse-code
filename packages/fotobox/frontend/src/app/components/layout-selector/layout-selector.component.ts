import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
// import { FotoboxFrontendSingleLayoutComponent } from '@mvse/fotobox/frontend-single-layout';
// import { FotoboxFrontendCollageLayoutComponent } from '@mvse/fotobox/frontend-collage-layout';
import {
  NewPhotoGQL,
  TriggerCameraGQL,
  TriggerPrinterGQL,
} from '@mvse/fotobox/frontend-data-access';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectMainConfiguration } from '../../store/mainConfiguration.selector';

const allowedLayouts = ['single', 'collage'];

@Component({
  selector: 'mvse-layout-selector',
  standalone: true,
  imports: [
    CommonModule,
    // FotoboxFrontendSingleLayoutComponent,
    // FotoboxFrontendCollageLayoutComponent,
  ],
  template: ``,
  // <mvse-fotobox-frontend-single-layout
  //   (onTriggerCamera)="triggerCamera()"
  //   (onTriggerPrinter)="triggerPrinter()"
  //   [photoUrl]="currentPhoto | async"
  //   [options]="{ showExitButton: showExitButton | async }"
  //   *ngIf="usedLayout === '${allowedLayouts[0]}'"
  // ></mvse-fotobox-frontend-single-layout>
  // <mvse-fotobox-frontend-collage-layout
  //   (onTriggerCamera)="triggerCamera()"
  //   (onTriggerPrinter)="triggerPrinter()"
  //   [photoUrl]="currentPhoto | async"
  //   [options]="{
  //     templateId: getTemplateId() | async,
  //     showExitButton: showExitButton | async
  //   }"
  //   *ngIf="usedLayout === '${allowedLayouts[1]}'"
  // ></mvse-fotobox-frontend-collage-layout>
  // `,
  styles: [],
})
export class LayoutSelectorComponent implements OnInit {
  usedLayout = this.route.snapshot.paramMap.get('layout') || 'unknown';
  mainConfigurationState = this.store.select(selectMainConfiguration);
  showExitButton = this.mainConfigurationState.pipe(
    map((state) => state.usedLayouts.length > 1)
  );
  usedLayouts$ = this.mainConfigurationState.pipe(
    map((state) => state.usedLayouts)
  );

  currentPhoto = this.newPhotoGql
    .subscribe()
    .pipe(map(({ data }) => data?.newPhoto.uri));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private newPhotoGql: NewPhotoGQL,
    private triggerCameraGql: TriggerCameraGQL,
    private triggerPrinterGql: TriggerPrinterGQL
  ) {
    if (allowedLayouts.includes(this.usedLayout)) {
      throw new Error(`Layout ${this.usedLayout} is not supported`);
    }
  }

  ngOnInit() {}

  getTemplateId() {
    return this.usedLayouts$.pipe(
      map((usedLayouts) => {
        const layout = usedLayouts.find(
          ({ component }) => component === this.usedLayout
        );
        if (layout) {
          return layout.config!.templateId;
        }
        this.router.navigate(['/home']);
        throw new Error(`Layout with name '${this.usedLayout}' not found.`);
      })
    );
  }

  triggerCamera() {
    this.triggerCameraGql.mutate().pipe(take(1)).subscribe();
  }

  triggerPrinter() {
    this.triggerPrinterGql.mutate().pipe(take(1)).subscribe();
  }
}
