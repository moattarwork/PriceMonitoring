import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './home/favorites/favorites.component';
import { SecuritiesComponent } from './home/securities/securities.component';
import { CardComponent } from './shared/components/card/card.component';
import { AppConfig } from './app-config';
import { ConfigModule, ConfigLoader, ConfigStaticLoader } from '@ngx-config/core';

import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];

export function configFactory(appConfig: AppConfig): ConfigLoader {
  return new ConfigStaticLoader(appConfig);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    SecuritiesComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: configFactory,
      deps: [AppConfig]
    }),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
