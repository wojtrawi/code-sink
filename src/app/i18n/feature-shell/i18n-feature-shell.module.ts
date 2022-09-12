import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nShellComponent } from './i18n-shell/i18n-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';

const routes: Routes = [
  {
    path: '',
    component: I18nShellComponent,
    children: [
      {
        path: 'one',
        loadChildren: () =>
          import('../feature-one/i18n-feature-one.module').then(
            ({ I18nFeatureOneModule }) => I18nFeatureOneModule
          ),
      },
      {
        path: 'two',
        loadChildren: () =>
          import('../feature-two/i18n-feature-two.module').then(
            ({ I18nFeatureTwoModule }) => I18nFeatureTwoModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [I18nShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoModule,
    TranslocoLocaleModule,
  ],
})
export class I18nFeatureShellModule {}
