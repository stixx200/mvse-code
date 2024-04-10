import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  ActionReducer,
  MetaReducer,
  provideState,
  provideStore,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { mainConfigurationFeature } from './store/mainConfiguration.reducer';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { MainConfigurationEffects } from './store/mainConfiguration.effects';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['global', 'collageLayout', 'singleLayout', 'mainConfiguration'],
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
        defaultLanguage: 'de',
      }),
      ApolloModule
    ),
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://127.0.0.1:3000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
    provideStore({}, { metaReducers }),
    provideState(mainConfigurationFeature),
    provideEffects(MainConfigurationEffects),
    importProvidersFrom(EffectsModule.forRoot([MainConfigurationEffects])),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
