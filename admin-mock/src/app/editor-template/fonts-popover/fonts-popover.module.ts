import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FontsPopoverPage } from './fonts-popover.page';

const routes: Routes = [
  {
    path: '',
    component: FontsPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FontsPopoverPage]
})
export class FontsPopoverPageModule {}
