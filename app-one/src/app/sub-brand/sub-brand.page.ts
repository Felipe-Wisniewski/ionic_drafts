import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sub-brand',
  templateUrl: './sub-brand.page.html',
  styleUrls: ['./sub-brand.page.scss'],
})
export class SubBrandPage implements OnDestroy {

  sub_marca: string[];
  brands: any[];
  subBrands: Object[] = [];

  subscription: Subscription;

  constructor(private route: ActivatedRoute, private storage: Storage, private router: Router) {
    this.getSubBrandsId();
    this.getBrandsStorage();
  }

  getSubBrandsId() {
    this.subscription = this.route.queryParams.subscribe(
      params => {
        let sbs = params['sub_marca'];
        this.sub_marca = sbs.split(",");
      }
    );
  }

  getBrandsStorage() {
    this.storage.get('brands').then((it) => {
      this.brands = it;
      this.getSubBrand();
    });
  }

  getSubBrand() {
    for (let i=0; i < this.brands.length; i++) {
      for (let j=0; j < this.sub_marca.length; ) {
        if (this.brands[i].cod_brand == this.sub_marca[j]) {
          this.subBrands.push(this.brands[i]);
        }  
        j++;
      }
    }
  }

  onClickSubBrand(brand) {
    this.router.navigate(['templates-posts'], {
      queryParams: {
        'cod_brand': brand.cod_brand 
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
