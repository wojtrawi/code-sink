import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, tap } from 'rxjs';
import { UserPreferencesService } from '../../user-preferences/data-access';
import { I18nInitializerService } from './i18n-initializer.service';
import { I18nLoaderService } from './i18n-loader.service';
import { AppLang } from './i18n.model';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(
    private readonly userPreferencesService: UserPreferencesService,
    private readonly i18nLoaderService: I18nLoaderService,
    private readonly i18nInitializerService: I18nInitializerService,
    private readonly i18nTranslationService: TranslocoService
  ) {}

  public get currentLang(): AppLang {
    return this.i18nTranslationService.getActiveLang() as AppLang;
  }

  public changeLang(appLang: AppLang): Observable<unknown> | void {
    this.userPreferencesService.setValue('lang', appLang);

    // If no reload (cannot rely on LOCALE_ID)
    // return this.setAppLang$(appLang);
    window.location.reload();
  }

  public initialize$(): Observable<unknown> {
    return this.i18nInitializerService.initialize$((appLang) =>
      this.setAppLang$(appLang)
    );
  }

  private setAppLang$(appLang: AppLang): Observable<unknown> {
    return this.i18nLoaderService.loadRemoteI18nData$(appLang).pipe(
      tap((appLang) => {
        this.i18nTranslationService.setActiveLang(appLang);
        this.setLangAttribute(appLang);
      })
    );
  }

  private setLangAttribute(appLang: AppLang): void {
    document.documentElement.setAttribute('lang', appLang);
  }
}
