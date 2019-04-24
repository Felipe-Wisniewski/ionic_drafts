import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProductsService } from './products.service';
import { pipe, Observable, Subject, empty } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  desc_brand: string;
  sub_marcas: string[];
  cod_brand: string;
  page: number;

  response$: Observable<Object[]>;
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

  //remover response$
  getProducts() {
    this.response$ = this.productsService.getProducts(this.cod_brand, this.page).pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      }),
      tap(p => {
        for(const prod of p) {
          console.log(this.products.length);
          this.products.push(prod);
        }
      })
    );
  }

  selectProduct(product) {
    console.log(product);
  }

  loadMore(iScroll) {
    setTimeout(() => {
      this.page++;
      this.getProducts();
      console.log("end");
      iScroll.target.complete();
    }, 2500);
  }
}
