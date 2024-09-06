import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi() // <== Don't forget to import the interceptors
    ),
    importProvidersFrom(NgHttpLoaderModule.forRoot()) //<== Always call `forRoot`
  ]
};