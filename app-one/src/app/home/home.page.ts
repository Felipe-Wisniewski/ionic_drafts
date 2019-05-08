import { Component, OnInit } from '@angular/core';
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
export class HomePage implements OnInit {

  brands$: Observable<Brand[]>;

  constructor(private homeService: HomeService, private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.brands$ = this.homeService.getBrands();
  }

  selectBrand(brand) {
    this.storage.set('brand', brand).then(it => {
      if (it.id_destaque == null || it.id_destaque == undefined) 
        this.router.navigate(['templates-posts']);
      else
        this.router.navigate(['sub-brand']);
    });
  }
}
