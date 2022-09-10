import { APP_INITIALIZER, FactoryProvider, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

function appConfigInitializer(): () => Observable<unknown> {
  const appConfigService = inject(AppConfigService);

  return () => appConfigService.config$;
}

export function provideAppConfigInitializer(): FactoryProvider {
  return {
    provide: APP_INITIALIZER,
    useFactory: appConfigInitializer,
    multi: true,
  };
}
