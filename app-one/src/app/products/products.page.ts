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

  title: string;

  id_brand: number;
  id_sub: number;

  sub_marcas: string[];
    
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
      this.title = brand.brand;

      if (brand.id_sub != null || brand.id_sub != undefined) {
        this.sub_marcas = brand.sub_marca.split(",");
        this.id_brand = parseInt(this.sub_marcas[0]);
      } else {
        this.id_brand = brand.cod_brand;
      }
      this.getProducts();
    });
  }

  getProducts() {
    this.subscription$.push(this.productsService.getProducts(this.id_brand, this.page, this.search)
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
