import { Injectable } from '@angular/core';
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
    private readonly userPreferencesService: UserPreferencesService
  ) {}

  public initialize$(
    appLangSetter: (appLang: AppLang) => Observable<unknown>
  ): Observable<unknown> {
    const setSupportedLangs$ = this.appConfigService.config$.pipe(
      map(({ supportedLangs }) => supportedLangs),
      snapshot(),
      tap((supportedLangs) => {
        // TODO: Call Transloco
        console.log('setting supportedLangs ', supportedLangs);
      })
    );

    const setAppLang$ = this.initialAppLang$.pipe(
      switchMap((appLang) => appLangSetter(appLang))
    );

    return merge(setSupportedLangs$, setAppLang$);
  }

  private getFallbackAppLang(): AppLang {
    // TODO: Browser lang -> default one (Transloco)
    return 'en';
  }
}
