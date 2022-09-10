import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppLang } from '../../i18n/data-access/i18n.model';
import {
  UserPreferences,
  UserPreferencesKeys,
  UserPreferencesState,
} from './user-preferences.model';

const INITIAL_STATE: UserPreferencesState = {
  loaded: false,
  data: {},
};

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  private readonly stateSubject = new BehaviorSubject<UserPreferencesState>(
    INITIAL_STATE
  );
  public readonly state$ = this.stateSubject.asObservable();

  constructor() {
    this.initialize();
  }

  public setValue<T extends UserPreferencesKeys>(
    key: T,
    value: UserPreferences[T]
  ): boolean {
    localStorage.setItem(key, value!);

    const newUserPreferences = this.getNewUserPreferences({ [key]: value });
    this.notifyStateChange({ data: newUserPreferences });

    return true;
  }

  private get currentState(): UserPreferencesState {
    return this.stateSubject.getValue();
  }

  private initialize(): void {
    const lang = localStorage.getItem('lang') as AppLang;

    const userPreferences: UserPreferences = {
      lang,
    };

    this.notifyStateChange({ data: userPreferences, loaded: true });
  }

  private getNewUserPreferences(update: UserPreferences): UserPreferences {
    const newUserPreferences: UserPreferences = {
      ...this.currentState.data,
      ...update,
    };

    return newUserPreferences;
  }

  private notifyStateChange(stateUpdate: Partial<UserPreferencesState>): void {
    const newState: UserPreferencesState = {
      ...this.currentState,
      ...stateUpdate,
    };

    this.stateSubject.next(newState);
  }
}
