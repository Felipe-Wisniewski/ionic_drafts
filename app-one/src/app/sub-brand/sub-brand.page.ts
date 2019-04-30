import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

import { SubBrandService } from './sub-brand.service';

@Component({
  selector: 'app-sub-brand',
  templateUrl: './sub-brand.page.html',
  styleUrls: ['./sub-brand.page.scss'],
})
export class SubBrandPage implements OnInit {

  title: string;
  id_brand: number;
  subs$: Observable<any[]>;

  constructor(private storage: Storage, private subBrandService: SubBrandService, private router: Router) { }

  ngOnInit() {
    this.getBrandStorage();
  }

  getBrandStorage() {
    this.storage.get('brand').then((brand) => {
      this.title = brand.brand;
      this.id_brand = brand.id_brand;
      this.getSubBrands();
    });
  }

  getSubBrands() {
    this.subs$ = this.subBrandService.getSubBrands(this.id_brand);
  }

  selectBrand(sub) {
    this.storage.set('brand', sub);
    this.router.navigate(['templates-posts']);
  }
}