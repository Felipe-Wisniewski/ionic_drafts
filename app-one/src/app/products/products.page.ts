import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProductsService } from './products.service';
import { Subject, empty, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {

  searchProd: string = "";
  search = [];

  desc_brand: string;
  sub_marcas: string[];
  cod_brand: string;
  page: number = 0;

  loading = false;
  subProducts$: Subscription[] = [];
  error$ = new Subject<boolean>();

  products = [];

  constructor(private storage: Storage, private productsService: ProductsService) { }

  ngOnInit() {
    this.getBrandId();
  }

  getBrandId() {
    this.storage.get('brand').then((brand) => {
      this.desc_brand = brand.desc_brand;

      if (brand.sub_marca != null || brand.sub_marca != undefined) {
        this.sub_marcas = brand.sub_marca.split(",");
        this.cod_brand = this.sub_marcas[0];
        this.page++;
        this.getProducts();
      } else {
        this.cod_brand = brand.cod_brand;
        this.page++;
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.subProducts$.push(this.productsService.getProducts(this.cod_brand, this.page)
      .pipe(
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty();
        })
      )
      .subscribe(p => {p.forEach(prod => {
          this.products.push(prod);          
        });
        this.loading = true;
      })
    );
  }

  searchProduct() {
    console.log(this.searchProd);
  }

  selectProduct(product) {
    console.log(this.subProducts$);
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
    this.subProducts$.forEach(s => s.unsubscribe());
  }
}
