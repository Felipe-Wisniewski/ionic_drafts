import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  brands: any;
  subscription: Subscription;

  constructor(private homeService: HomeService, private router: Router) {
    this.loadBrands();
  }

  loadBrands() {
    this.subscription = this.homeService.getBrands().subscribe(
      resp => this.brands = resp);
  }

  selectBrand(brand) {
    if (brand.sub_marca == null) {
      this.router.navigate(['templates-posts'], {
        queryParams: {
          'cod_brand': brand.cod_brand
        }
      });

    } else {
      this.router.navigate(['sub-brand'], {
        queryParams: {
          'sub_marca': brand.sub_marca
        }
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
