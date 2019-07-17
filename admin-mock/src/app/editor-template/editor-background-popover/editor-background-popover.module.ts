import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditorBackgroundPopoverPage } from './editor-background-popover.page';

const routes: Routes = [
  {
    path: '',
    component: EditorBackgroundPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditorBackgroundPopoverPage]
})
export class EditorBackgroundPopoverPageModule {}
