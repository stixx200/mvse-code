import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AddPhotoToCollageGQL,
  Collage,
  InitCollageGQL,
  ResetCollageGQL,
} from '@mvse/fotobox/frontend-data-access';
import { filter, map, merge, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'mvse-fotobox-frontend-collage-image',
  templateUrl: './collage-image.component.html',
  styleUrls: ['./collage-image.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CollageImageComponent implements OnInit {
  previewAvailable = true;
  @Input() templateId!: string;

  initCollage$ = new Subject<string>();
  addPhoto$ = new Subject<string>();
  resetCollage$ = new Subject<void>();
  onCollageRendered = merge(
    this.initCollage$.pipe(
      switchMap((templateId: string) => {
        console.log(`initCollageTriggered: ${templateId}`);
        return this.initCollage.mutate({ TemplateId: templateId });
      }),
      map(({ data }) => {
        if (!data) {
          console.error('failed to initialize collage. Return to home.');
          this.router.navigate(['/home']);
          throw new Error('failed to initialize collage.');
        }
        this.previewAvailable = data?.initCollage?.photoCount > 1;
        return data?.initCollage;
      })
    ),
    this.addPhoto$.pipe(
      switchMap((photo: string) => {
        console.log(`addPhoto triggered: ${photo}`);
        return this.addPhotoToCollage.mutate({ Photo: photo });
      }),
      map(({ data }) => data?.addPhotoToCollage)
    ),
    this.resetCollage$.pipe(
      switchMap(() => {
        console.log(`resetCollage triggered`);
        return this.resetCollage.mutate();
      }),
      map(({ data }) => data?.resetCollage)
    )
  ).pipe(
    map((result) => {
      if (!result) {
        console.error('failed create collage. Return to home.');
        this.router.navigate(['/home']);
        throw new Error('Failed to create collage');
      }
      return result;
    })
  );
  @Output('done') done = this.onCollageRendered.pipe(
    filter((collage: Collage) => collage.done)
  );

  constructor(
    private router: Router,
    private readonly initCollage: InitCollageGQL,
    private readonly resetCollage: ResetCollageGQL,
    private readonly addPhotoToCollage: AddPhotoToCollageGQL
  ) {}

  async ngOnInit() {
    this.initCollage$.next(this.templateId);
  }

  async addPhoto(photo: string) {
    this.addPhoto$.next(photo);
  }

  reset() {
    this.resetCollage$.next();
  }

  exit() {
    this.router.navigate(['/home']);
  }
}
