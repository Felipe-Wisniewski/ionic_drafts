import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditorStampsPopoverPage } from './editor-stamps-popover.page';

const routes: Routes = [
  {
    path: '',
    component: EditorStampsPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditorStampsPopoverPage]
})
export class EditorStampsPopoverPageModule {}
