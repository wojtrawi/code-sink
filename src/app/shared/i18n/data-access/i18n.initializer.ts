import { APP_INITIALIZER, FactoryProvider, inject } from '@angular/core';
import { I18nService } from './i18n.service';

function i18nInitializer() {
  const i18nService = inject(I18nService);

  return () => i18nService.initialize$();
}

export function provideI18nInitializer(): FactoryProvider {
  return {
    provide: APP_INITIALIZER,
    useFactory: i18nInitializer,
    multi: true,
  };
}
