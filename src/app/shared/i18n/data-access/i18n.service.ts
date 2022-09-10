import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserPreferencesService } from '../../user-preferences/data-access';
import { I18nInitializerService } from './i18n-initializer.service';
import { I18nLoaderService } from './i18n-loader.service';
import { AppLang } from './i18n.model';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private _currentLang!: AppLang;

  constructor(
    private readonly userPreferencesService: UserPreferencesService,
    private readonly i18nLoaderService: I18nLoaderService,
    private readonly i18nInitializerService: I18nInitializerService
  ) {}

  public getCurrentLang(): AppLang {
    return this._currentLang;
  }

  public changeLang(appLang: AppLang): Observable<unknown> | void {
    console.log('changing lang: ', appLang);

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
        // TODO: Call Transloco
        console.log('setting lang: ', appLang);
        this._currentLang = appLang;

        this.setLangAttribute(appLang);
      })
    );
  }

  private setLangAttribute(appLang: AppLang): void {
    document.documentElement.setAttribute('lang', appLang);
  }
}
