import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  //tipar marca
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
    this.storage.set('brand', brand);

    if (brand.sub_marca == null) {  
      this.router.navigate(['templates-posts']);

    } else {
      this.router.navigate(['sub-brand']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
