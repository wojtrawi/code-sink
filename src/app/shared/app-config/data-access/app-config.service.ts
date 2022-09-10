import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from './app-config.model';
import { shareWithTTL } from '../../utils-rxjs-operators';

const APP_CONFIG_TTL = 60000;

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  public readonly config$: Observable<AppConfig> = this.http
    .get<AppConfig>('assets/app-config.json')
    .pipe(shareWithTTL(APP_CONFIG_TTL));

  constructor(private readonly http: HttpClient) {}
}
