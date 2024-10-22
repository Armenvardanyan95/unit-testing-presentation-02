import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { todosFeature } from './store/todos.feature';
import { provideEffects } from '@ngrx/effects';
import * as todosEffects from './store/effects';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(todosFeature),
    provideEffects([todosEffects]),
    provideHttpClient(withFetch()),
  ],
};
