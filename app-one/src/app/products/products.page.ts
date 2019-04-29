import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {

  desc_brand: string;
  sub_marcas: string[];
  cod_brand: string;
  
  page: number = 1;
  loaded = false;
  subscription$: Subscription[] = [];

  products = [];
  search: string = "";

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
      } else {
        this.cod_brand = brand.cod_brand;
      }
      this.getProducts();
    });
  }

  getProducts() {
    this.subscription$.push(this.productsService.getProducts(this.cod_brand, this.page, this.search)
      .subscribe(p => {
        p.forEach(prod => {
          this.products.push(prod);          
        });
        this.loaded = true;
      })
    );
  }

  searchProduct() {
    this.page = 1;
    this.products = [];
    this.getProducts();
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
    this.subscription$.forEach(s => s.unsubscribe());
  }
}
