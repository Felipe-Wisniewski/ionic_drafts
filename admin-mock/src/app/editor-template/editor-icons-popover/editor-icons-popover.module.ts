import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditorIconsPopoverPage } from './editor-icons-popover.page';

const routes: Routes = [
  {
    path: '',
    component: EditorIconsPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditorIconsPopoverPage]
})
export class EditorIconsPopoverPageModule {}
