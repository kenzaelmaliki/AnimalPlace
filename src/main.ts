import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

defineCustomElements(window);
if (environment.production) {
  enableProdMode();
}

/*platformBrowserDynamic()
  .bootstrapModule(AppComponent)
  .then(() => defineCustomElements(window)) // Add this line
  .catch((err) => console.log(err));*/

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(IonicStorageModule.forRoot()),
  ],
});
