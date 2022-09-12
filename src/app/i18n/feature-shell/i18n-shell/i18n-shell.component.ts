import { Component, inject, LOCALE_ID } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { I18nService } from 'src/app/shared/i18n/data-access';
import { AppLang } from 'src/app/shared/i18n/data-access/i18n.model';

@Component({
  selector: 'app-i18n-shell',
  templateUrl: './i18n-shell.component.html',
  styleUrls: ['./i18n-shell.component.scss'],
})
export class I18nShellComponent {
  public readonly LOCALE_ID = inject(LOCALE_ID);
  public readonly availableLangs =
    this.i18nService.getAvailableLangs() as AppLang[];
  public readonly activeLang = this.i18nService.getActiveLang();
  public readonly today = new Date();
  public readonly username = 'Wojtek';

  private additionalInfo =
    this.i18nTranslationService.translate('ADDITIONAL_INFO');

  constructor(
    private readonly i18nService: I18nService,
    private readonly i18nTranslationService: TranslocoService
  ) {}

  public changeAppLang(appLang: AppLang): void {
    this.i18nService.changeLang(appLang);
    // this.i18nService.changeLang(newLocale)?.subscribe(() => {});
  }
}
