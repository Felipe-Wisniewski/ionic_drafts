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

  id_brand?: number;
  id_sub?: number;
  num_prod: number;
  selected_products: number[] = [];
  selected: boolean = false;

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
    this.storage.get('template').then((tpt) => {
      console.log(tpt);
      this.num_prod = tpt.products;
    });

    this.storage.get('brand').then((brand) => {
      console.log(brand);
      this.title = brand.brand;
      this.id_sub = brand.id_sub;
      this.id_brand = brand.id_brand;

      this.getProducts();
    });  
  }

  getProducts() {
    this.subscription$.push(this.productsService.getProducts(this.id_brand, this.id_sub, this.page, this.search)
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

  selectProduct(event) {
    console.log(event);
    // console.log(`Id - ${id_prod} , Index - ${index}`);
    // this.selected = !this.selected;
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
