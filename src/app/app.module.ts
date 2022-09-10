import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAppConfigInitializer } from './shared/app-config/data-access';
import {
  provideI18nInitializer,
  provideLocaleId,
} from './shared/i18n/data-access';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    provideAppConfigInitializer(),
    provideI18nInitializer(),
    provideLocaleId(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
