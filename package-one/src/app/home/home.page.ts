import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  dataJson: any;
  brands: any;

  subscription: Subscription;

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.subscription = this.homeService.getBrands().subscribe(
      (data) => {
        console.log(data)
        this.dataJson =  data
        this.brands = this.dataJson.brands
      },
      (error) => {
        console.error(error)
      }
    );
  }

  newPost(brand) {
    if (brand.brand == 'TAL MAE TAL FILHA') {
      this.router.navigate(['/sub-brand'], {
        queryParams: { 'brand': brand.brand }
      });
    
    } else {
      this.router.navigate(['template'], {
        queryParams: { 'id_brand': brand.id }
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
