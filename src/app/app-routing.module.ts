import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'i18n',
    loadChildren: () =>
      import('./i18n/feature-shell/i18n-feature-shell.module').then(
        ({ I18nFeatureShellModule }) => I18nFeatureShellModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/i18n',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
