import { Injectable } from '@angular/core';
import { TranslocoService, getBrowserLang } from '@ngneat/transloco';
import { filter, map, merge, Observable, switchMap, tap } from 'rxjs';
import { AppConfigService } from '../../app-config/data-access';
import { UserPreferencesService } from '../../user-preferences/data-access';
import { snapshot } from '../../utils-rxjs-operators';
import { AppLang } from './i18n.model';

@Injectable({
  providedIn: 'root',
})
export class I18nInitializerService {
  private initialAppLang$ = this.userPreferencesService.state$.pipe(
    filter(({ loaded }) => loaded),
    map(({ data }) => data?.lang || this.getFallbackAppLang()),
    snapshot()
  );

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly userPreferencesService: UserPreferencesService,
    private readonly i18nTranslationService: TranslocoService
  ) {}

  public initialize$(
    appLangSetter: (appLang: AppLang) => Observable<unknown>
  ): Observable<unknown> {
    const setSupportedLangs$ = this.appConfigService.config$.pipe(
      map(({ supportedLangs }) => supportedLangs),
      snapshot(),
      tap((supportedLangs) => {
        this.i18nTranslationService.setAvailableLangs(supportedLangs);
      })
    );

    const setAppLang$ = this.initialAppLang$.pipe(
      switchMap((appLang) => appLangSetter(appLang))
    );

    return merge(setSupportedLangs$, setAppLang$);
  }

  private getFallbackAppLang(): AppLang {
    // TODO: Check if browser lang is supported
    return (getBrowserLang() ||
      this.i18nTranslationService.getDefaultLang()) as AppLang;
  }
}
