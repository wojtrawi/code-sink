import {
  ChangeDetectionStrategy,
  Component,
  inject,
  LOCALE_ID,
} from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { I18nService } from './shared/i18n/data-access';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'code-sink rocks!';
  date = new Date();
  localeId = inject(LOCALE_ID);
  additional = this.i18nTranslationService.translate('ADDITIONAL_INFO');
  // lang = this.i18nService.getCurrentLang();

  constructor(
    private readonly i18nService: I18nService,
    private readonly i18nTranslationService: TranslocoService
  ) {}

  get cookies() {
    return document.cookie;
  }

  setCookie() {
    document.cookie = 'user=Wojtek; max-age=3600';
  }

  changeLocale() {
    const newLocale = this.localeId === 'pl' ? 'en' : 'pl';
    this.i18nService.changeLang(newLocale);
    // this.i18nService.changeLang(newLocale)?.subscribe(() => {
    //   this.lang = this.i18nService.getCurrentLang();
    // });
  }
}
