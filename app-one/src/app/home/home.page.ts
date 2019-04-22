import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { HomeService } from './home.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  brands: any;
  subscription: Subscription;

  constructor(private homeService: HomeService, private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.subscription = this.homeService.getBrands().subscribe(
      resp => this.brands = resp);
  }

  selectBrand(brand) {
    if (brand.sub_marca == null) {
      this.storage.set('brand', brand);
      this.router.navigate(['templates-posts']);

    } else {
      this.storage.set('sub_marca', brand.sub_marca);
      this.router.navigate(['sub-brand']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
