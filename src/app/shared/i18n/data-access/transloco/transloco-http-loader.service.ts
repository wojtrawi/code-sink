import { HttpClient } from '@angular/common/http';
import { ClassProvider, Injectable } from '@angular/core';
import {
  TranslocoLoader,
  Translation,
  TRANSLOCO_LOADER,
} from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoaderService implements TranslocoLoader {
  constructor(private readonly http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
  }
}

export function provideTranslocoLoader(): ClassProvider {
  return {
    provide: TRANSLOCO_LOADER,
    useClass: TranslocoHttpLoaderService,
  };
}
