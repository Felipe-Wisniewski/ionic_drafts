import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

import { HomeService } from './home.service';
import { Brand } from '../model/brand';
import { PopoverController } from '@ionic/angular';
import { TemplatesPostsPopoverPage } from '../templates-posts-popover/templates-posts-popover.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  brands$: Observable<Brand[]>

  constructor(
    private homeService: HomeService, 
    private storage: Storage, 
    private router: Router, 
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.loadBrands()
  }

  loadBrands() {
    this.brands$ = this.homeService.getBrands()
  }

  selectBrand(brand) {
    this.storage.set('brand', brand).then(it => {
      if (it.id_highlight == null || it.id_highlight == undefined) 
        this.templatesOrPostsPopover(brand)
      else
        this.router.navigate(['sub-brand'])
    })
  }

  async templatesOrPostsPopover(brand) {
    const popover = await this.popoverController.create({
      component: TemplatesPostsPopoverPage,
      backdropDismiss: false,
      keyboardClose: true,
      animated: true,
      translucent: true,
      mode: "md",
      cssClass: 'custom-popover',
      componentProps: {
        brand: brand
      }
    })
    

    return await popover.present()
  }
}