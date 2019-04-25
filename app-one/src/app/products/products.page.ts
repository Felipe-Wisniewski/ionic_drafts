import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProductsService } from './products.service';
import { pipe, Observable, Subject, empty, Subscription } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {

  desc_brand: string;
  sub_marcas: string[];
  cod_brand: string;
  page: number = 0;

  loading = false;
  subscription: Subscription[] = [];
  error$ = new Subject<boolean>();

  products = [];

  constructor(private storage: Storage, private productsService: ProductsService) { }

  ngOnInit() {
    this.getBrandId();
  }

  getBrandId() {
    this.storage.get('brand').then((it) => {
      if (it.sub_marca != null || it.sub_marca != undefined) {
        this.desc_brand = it.desc_brand;
        this.sub_marcas = it.sub_marca.split(",");
        this.cod_brand = this.sub_marcas[0];
        this.page++;
        this.getProducts();

      } else {
        this.cod_brand = it.cod_brand;
        this.page++;
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.subscription.push(this.productsService.getProducts(this.cod_brand, this.page)
      .pipe(
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty();
        })
      )
      .subscribe(p => {
        for(const prod of p) {
          this.products.push(prod);
        }
        this.loading = true;
      })
    );
  }

  selectProduct(product) {
    console.log(product);
  }

  loadMore(iScroll) {
    setTimeout(() => {
      if (this.page < ProductsService.pages) {
        this.page++;
        this.getProducts();
      }
      iScroll.target.complete();
    }, 3500);
  }

  ngOnDestroy() {
    console.log(`ProductsPage OnDestroy`);
    this.subscription.forEach(s => s.unsubscribe());
  }
}
