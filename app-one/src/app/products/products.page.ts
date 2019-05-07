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

  products = [];
  numberOfproducts: number;
  selectedProducts = [];
  isSelected: boolean = false;

  page: number = 1;
  subscription$: Subscription[] = [];

  search: string = "";
  loaded = false;

  constructor(private storage: Storage, private productsService: ProductsService) { }

  ngOnInit() {
    this.getChosenTemplateBrand();
  }

  getChosenTemplateBrand() {
    this.storage.get('brand').then((brand) => {
      console.log(brand);
      this.title = brand.brand;
      this.id_brand = brand.id_brand;
      this.id_sub = brand.id_sub;
      this.getProducts();
    });  

    this.storage.get('template').then((temp) => {
      console.log(temp);
      if (temp.id_brand == '' || temp.id_brand == null || temp.id_brand == undefined) {
        this.numberOfproducts = temp.products;
      } else {
        this.numberOfproducts = temp.products;
      }
      
    });
  }

  getProducts() {
    this.subscription$.push(this.productsService.getProducts(this.id_brand, this.id_sub, this.page, this.search)
      .subscribe(resp => {
        resp.forEach(prod => this.products.push(prod));
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
    let notRepeated = true;
    console.log(`a. - ${this.selectedProducts.length}`);
    for (let i = 0; i < this.selectedProducts.length; i++) {
      if (product.id == this.selectedProducts[i].id) {
        this.selectedProducts.splice(i, 1);
        notRepeated = false;
        console.log(`b. - ${this.selectedProducts.length}`);
      }
    }

    if (notRepeated && this.selectedProducts.length < this.numberOfproducts) {
      this.selectedProducts.push(product);
      // isSelected
      console.log(`c. - ${this.selectedProducts.length}`);
    }

    console.log(`d. - ${this.selectedProducts.length}`);
    console.log(this.selectedProducts);
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
