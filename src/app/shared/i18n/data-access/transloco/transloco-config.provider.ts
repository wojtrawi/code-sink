import { ValueProvider } from '@angular/core';
import {
  TranslocoConfig,
  translocoConfig,
  TRANSLOCO_CONFIG,
} from '@ngneat/transloco';
import { environment } from 'src/environments/environment';

const TRANSLOCO_CFG: TranslocoConfig = translocoConfig({
  availableLangs: ['en', 'pl', 'fr'],
  defaultLang: 'en',
  fallbackLang: 'en',
  missingHandler: {
    logMissingKey: true,
    allowEmpty: false,
    useFallbackTranslation: true,
  },
  reRenderOnLangChange: false,
  prodMode: environment.production,
});

export function provideTranslocoConfig(): ValueProvider {
  return {
    provide: TRANSLOCO_CONFIG,
    useValue: TRANSLOCO_CFG,
  };
}
