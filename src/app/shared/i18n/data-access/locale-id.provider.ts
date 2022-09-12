import { FactoryProvider, inject, LOCALE_ID } from '@angular/core';
import { I18nService } from './i18n.service';

function localeIdFactory() {
  const i18nService = inject(I18nService);

  return i18nService.getActiveLang();
}

export function provideLocaleId(): FactoryProvider {
  return {
    provide: LOCALE_ID,
    useFactory: localeIdFactory,
  };
}
