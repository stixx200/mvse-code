import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { GetCameraDriversGQL } from '@mvse/fotobox/frontend-data-access';
import {
  loadDataFromBackend,
  setCameraDrivers,
} from './mainConfiguration.reducer';

@Injectable()
export class MainConfigurationEffects {
  loadDataFromBackend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDataFromBackend.type),
      exhaustMap(() => this.getCameraDriversGQL.fetch()),
      map((cameraDriversResult) => ({
        type: setCameraDrivers.type,
        payload: cameraDriversResult.data,
      })),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private actions$: Actions,
    private readonly getCameraDriversGQL: GetCameraDriversGQL
  ) {}
}
