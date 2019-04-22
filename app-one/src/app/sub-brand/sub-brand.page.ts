import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-sub-brand',
  templateUrl: './sub-brand.page.html',
  styleUrls: ['./sub-brand.page.scss'],
})
export class SubBrandPage implements OnInit {

  sub_marca: string[];
  brands: any[];
  subBrands: Object[] = [];

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.getSubBrandsId();
    this.getBrandsStorage();
  }

  getSubBrandsId() {
    this.storage.get('sub_marca').then((it) => {
      this.sub_marca = it.split(",");
    });
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
    this.storage.set('cod_brand', brand.cod_brand);
    this.router.navigate(['templates-posts']);
  }
}
