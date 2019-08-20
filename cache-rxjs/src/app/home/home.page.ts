import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  prod$: Observable<Product[]>

  constructor(private hService: HomeService, private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.prod$ = this.hService.products
  }

  ionRefresh(event) {
    console.log(event)
  }

  selectProduct(product) {
    console.log(product)
    this.storage.set('prod', product).finally(() => {
      this.router.navigate(['view-product'])
    })
  }

  loadErrorImg($event) {
    console.log('error load')
  }
}
