import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ColorsPopoverPage } from './colors-popover.page';

const routes: Routes = [
  {
    path: '',
    component: ColorsPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ColorsPopoverPage]
})
export class ColorsPopoverPageModule {}
