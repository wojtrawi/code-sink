import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { provideTranslocoLoader } from './transloco-http-loader.service';
import { provideTranslocoConfig } from './transloco-config.provider';

@NgModule({
  exports: [TranslocoModule],
  imports: [
    // TranslocoModule,
    TranslocoLocaleModule.forRoot({
      langToLocaleMapping: {
        en: 'en-US',
        fr: 'fr-FR',
        pl: 'pl-PL',
      },
    }),
  ],
  providers: [provideTranslocoConfig(), provideTranslocoLoader()],
})
export class TranslocoRootModule {}
