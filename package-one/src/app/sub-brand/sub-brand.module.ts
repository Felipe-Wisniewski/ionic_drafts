import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubBrandPage } from './sub-brand.page';

/* const routes: Routes = [
  {
    path: '',
    component: SubBrandPage
  }
]; */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule/* ,
    RouterModule.forChild(routes) */
  ],
  declarations: [SubBrandPage]
})
export class SubBrandPageModule {}
