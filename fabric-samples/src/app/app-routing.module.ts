import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },  { path: 'home-modal', loadChildren: './home-modal/home-modal.module#HomeModalPageModule' },
  { path: 'gallery', loadChildren: './gallery/gallery.module#GalleryPageModule' },
  { path: 'share', loadChildren: './share/share.module#SharePageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
