import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TemplatesPopoverPage } from './templates-popover.page';

const routes: Routes = [
  {
    path: '',
    component: TemplatesPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TemplatesPopoverPage]
})
export class TemplatesPopoverPageModule {}
