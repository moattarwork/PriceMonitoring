import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppConfig } from './app/app-config';

if (environment.production) {
  enableProdMode();
}

fetch('./assets/config.json')
  .then(data => data.json().then((appConfig) => {
    platformBrowserDynamic([{ provide: AppConfig, useValue: appConfig }])
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  })).catch(err => console.error('config.json is not available'));

