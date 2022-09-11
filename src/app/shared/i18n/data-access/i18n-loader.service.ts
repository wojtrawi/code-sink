import { Injectable } from '@angular/core';
import { Translation, TranslocoService } from '@ngneat/transloco';
import { forkJoin, from, map, Observable, tap } from 'rxjs';
import { ScriptLoaderService } from '../../utils';
import { AppLang } from './i18n.model';

@Injectable({
  providedIn: 'root',
})
export class I18nLoaderService {
  constructor(
    private readonly scriptLoaderService: ScriptLoaderService,
    private readonly i18nTranslationService: TranslocoService
  ) {}

  public loadRemoteI18nData$(appLang: AppLang): Observable<AppLang> {
    // TODO: Handle errors
    return forkJoin({
      translationsLoaded: this.loadTranslations(appLang),
      localeDataLoaded: this.loadLocaleData(appLang),
    }).pipe(map(() => appLang));
  }

  private loadTranslations(appLang: AppLang): Observable<Translation> {
    return this.i18nTranslationService.load(appLang);
  }

  private loadLocaleData(appLang: AppLang): Observable<unknown> {
    return from(this.scriptLoaderService.load(`assets/locales/${appLang}.js`));
  }
}
