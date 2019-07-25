import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TemplatesPage } from './templates.page';
import { IdLangPipe } from '../shared/id-lang.pipe';

const routes: Routes = [
  {
    path: '',
    component: TemplatesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TemplatesPage,
    IdLangPipe
  ],
  providers: [IdLangPipe]
})
export class TemplatesPageModule { }
