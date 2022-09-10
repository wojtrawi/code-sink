import { Injectable } from '@angular/core';
import { forkJoin, from, map, Observable, of } from 'rxjs';
import { ScriptLoaderService } from '../../utils';
import { AppLang } from './i18n.model';

@Injectable({
  providedIn: 'root',
})
export class I18nLoaderService {
  constructor(private readonly scriptLoaderService: ScriptLoaderService) {}

  public loadRemoteI18nData$(appLang: AppLang): Observable<AppLang> {
    // TODO: Handle errors
    return forkJoin({
      translationsLoaded: this.loadTranslations(appLang),
      localeDataLoaded: this.loadLocaleData(appLang),
    }).pipe(map(() => appLang));
  }

  private loadTranslations(appLang: AppLang): Observable<unknown> {
    // TODO: Call Transloco
    console.log('loading translations for: ', appLang);

    return of(appLang);
  }

  private loadLocaleData(appLang: AppLang): Observable<unknown> {
    return from(this.scriptLoaderService.load(`assets/locales/${appLang}.js`));
  }
}
