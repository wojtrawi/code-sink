import { AppLang } from '../../i18n/data-access/i18n.model';

type AppTheme = 'light' | 'dark';

export interface UserPreferences {
  lang?: AppLang;
  theme?: AppTheme;
}

export type UserPreferencesKeys = keyof UserPreferences;

export interface UserPreferencesState {
  loaded: boolean;
  data: UserPreferences;
}
