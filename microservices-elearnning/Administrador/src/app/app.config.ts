import { ApplicationConfig, CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom, NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideStore } from '@ngrx/store';
import { Title } from '@angular/platform-browser';

import { routes } from './app.routes';
import { indexReducer } from './store/index.reducer';
import { AppService } from './services/app.service';
import {
  tokenInterceptor,
  unauthorizedInterceptor,
} from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        // onViewTransitionCreated(transitionInfo) {
        //     console.log(transitionInfo)
        // },
      })
    ),
    provideHttpClient(
      withInterceptors([tokenInterceptor, unauthorizedInterceptor])
    ),
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
    ),
    provideStore({ index: indexReducer }),
    AppService,
    Title,
  ],
};
