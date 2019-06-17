import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { Subdivision } from '../model/brand';

@Component({
  selector: 'app-sub-brand',
  templateUrl: './sub-brand.page.html',
  styleUrls: ['./sub-brand.page.scss'],
})
export class SubBrandPage implements OnInit {

  title: string
  loaded = false
  subs: Subdivision[]

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.getBrandStorage()
  }

  getBrandStorage() {
    this.storage.get('brand').then(brand => {
      this.title = brand.brand
      this.subs = brand.subdivisions
    })
    this.loaded = true
  }

  selectBrand(sub) {
    this.storage.set('brand', sub).then(() => {
      this.router.navigate(['templates-posts'])
    })
  }
}
