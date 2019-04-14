import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TemplatePage } from './template.page';
import { TemplateService } from './template.service';

const routes: Routes = [
  {
    path: '',
    component: TemplatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TemplatePage],
  providers: [TemplateService]
})
export class TemplatePageModule {}
