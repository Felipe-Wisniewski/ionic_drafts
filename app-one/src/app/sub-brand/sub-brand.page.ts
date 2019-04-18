import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sub-brand',
  templateUrl: './sub-brand.page.html',
  styleUrls: ['./sub-brand.page.scss'],
})
export class SubBrandPage implements OnDestroy {

  sub_marca: string[];
  subs: any[];
  subBrands: any[];
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private storage: Storage) {
    this.getSubBrandsId();
    this.getBrandsStorage();
  }

  getSubBrandsId() {
    this.subscription = this.route.queryParams.subscribe(
      params => {
        let sbs = params['sub_marca'];
        this.sub_marca = sbs.split(",");
        console.log(`sub_marca: ${this.sub_marca}`);
      }
    );
  }

  getBrandsStorage() {
    this.storage.get('brands').then((it) => {
      console.log(`getBrandsStorage it: ${it}`);
      this.subs = it;
      this.getSubBrand();
    });
  }

  getSubBrand() {
    console.log(`getSubBrand subs: ${this.subs}`);
    for (let i=0; i < this.subs.length; i++) {
      console.log('1');
      for (let j=0; j < this.sub_marca.length; ) {
        console.log('2');
        if (this.subs[i].cod_brand === this.sub_marca[j]) {
          console.log(`if: ${this.subs[i]}`)
          this.subBrands.push(this.subs[i]);
          j++
        }  
      }
    }
    console.log(`subBrands: ${this.subBrands}`);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
