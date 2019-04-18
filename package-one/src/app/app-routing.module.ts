import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { SubBrandPage } from './sub-brand/sub-brand.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'template', loadChildren: './template/template.module#TemplatePageModule' },
  { path: 'sub-brand', component: SubBrandPage },  { path: 'templates-posts', loadChildren: './templates-posts/templates-posts.module#TemplatesPostsPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
