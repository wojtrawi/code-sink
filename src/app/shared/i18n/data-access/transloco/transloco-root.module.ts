import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { provideTranslocoLoader } from './transloco-http-loader.service';
import { provideTranslocoConfig } from './transloco-config.provider';

@NgModule({
  exports: [TranslocoModule],
  providers: [provideTranslocoConfig(), provideTranslocoLoader()],
})
export class TranslocoRootModule {}
