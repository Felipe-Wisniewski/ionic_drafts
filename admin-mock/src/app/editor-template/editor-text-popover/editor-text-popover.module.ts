import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditorTextPopoverPage } from './editor-text-popover.page';

const routes: Routes = [
  {
    path: '',
    component: EditorTextPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditorTextPopoverPage]
})
export class EditorTextPopoverPageModule {}
