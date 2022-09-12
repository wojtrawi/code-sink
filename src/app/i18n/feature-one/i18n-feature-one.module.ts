import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { I18nOneComponent } from './i18n-one/i18n-one.component';

const routes: Routes = [{ path: '', component: I18nOneComponent }];

@NgModule({
  declarations: [I18nOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class I18nFeatureOneModule {}
