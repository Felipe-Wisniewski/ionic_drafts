import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

import { HomeService } from './home.service';
import { Brand } from './brand';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  brands$: Observable<Brand[]>;

  constructor(private homeService: HomeService, private storage: Storage, private router: Router) {
    this.loadBrands();
  }

  loadBrands() {
    this.brands$ = this.homeService.getBrands();
  }

  selectBrand(brand) {
    this.storage.set('brand', brand);

    if (brand.id_destaque != null || brand.id_destaque != undefined) {  
      this.router.navigate(['sub-brand']);
    } else {
      this.router.navigate(['templates-posts']);
    }
  }
}
