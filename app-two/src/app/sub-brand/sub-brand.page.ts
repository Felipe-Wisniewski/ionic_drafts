import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Subdivision } from '../model/brand';
import { PopoverController } from '@ionic/angular';
import { TemplatesPostsPopoverPage } from '../templates-posts-popover/templates-posts-popover.page';

@Component({
  selector: 'app-sub-brand',
  templateUrl: './sub-brand.page.html',
  styleUrls: ['./sub-brand.page.scss'],
})
export class SubBrandPage implements OnInit {

  title: string
  loaded = false
  subs: Subdivision[]

  constructor(private storage: Storage, private popoverController: PopoverController) { }

  ngOnInit() {
    this.getBrandStorage()
  }

  getBrandStorage() {
    this.storage.get('brand').then(brand => {
      this.title = brand.brand
      this.subs = brand.subdivisions

      this.subs.sort((a, b) => {
        if (a.id_subdivision > b.id_subdivision) return 1
        if (a.id_subdivision < b.id_subdivision) return -1
        return 0
      })
    })
    this.loaded = true
  }

  selectBrand(sub) {
    this.storage.set('brand', sub).then(() => {
      this.templatesOrPostsPopover()
    })
  }

  async templatesOrPostsPopover() {
    const popover = await this.popoverController.create({
      component: TemplatesPostsPopoverPage,
      keyboardClose: false,
      animated: true,
      translucent: true,
      mode: "md"
    })
    return await popover.present()
  }
}
