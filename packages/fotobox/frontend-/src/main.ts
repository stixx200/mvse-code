import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import {
  ActionReducer,
  MetaReducer,
  provideState,
  provideStore,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { mainConfigurationFeature } from '../../frontend/src/app/store/mainConfiguration.reducer';
import { titleFeature } from '../../frontend/src/app/store/title.reducer';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['global', 'collageLayout', 'singleLayout', 'mainConfiguration'],
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideStore({}, { metaReducers }),
    provideState(titleFeature),
    provideState(mainConfigurationFeature),
  ],
}).catch((err) => console.error(err));
