import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'sub-brand', loadChildren: './sub-brand/sub-brand.module#SubBrandPageModule' },
  { path: 'templates-posts', loadChildren: './templates-posts/templates-posts.module#TemplatesPostsPageModule' },
  { path: 'posts', loadChildren: './posts/posts.module#PostsPageModule' },
  { path: 'templates', loadChildren: './templates/templates.module#TemplatesPageModule' },
  { path: 'products', loadChildren: './products/products.module#ProductsPageModule' },
  { path: 'editor', loadChildren: './editor/editor.module#EditorPageModule' },
  { path: 'follow', loadChildren: './follow/follow.module#FollowPageModule' },
  { path: 'gallery', loadChildren: './gallery/gallery.module#GalleryPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
