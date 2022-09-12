import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nTwoComponent } from './i18n-two/i18n-two.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: I18nTwoComponent }];

@NgModule({
  declarations: [I18nTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class I18nFeatureTwoModule {}
