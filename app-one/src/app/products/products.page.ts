import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  numberOfProducts: number;
  id_brand: number;
  id_subdivision: number;

  index = [];
  isSelected = false;
  
  subscription$: Subscription[] = [];
  loaded = false;
  page = 1;

  search= "";
  max_products: number;
  max_products_subdivision: number;
  relations_sub = "";
  products = [];
  selectedProducts = [];
  
  constructor(private storage: Storage, 
    private productsService: ProductsService,
    public toast: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.getChosenBrand();
    this.getChosenTemplate();
  }

  getChosenBrand() {
    this.storage.get('brand').then(brand => {
      console.log(brand);
      if (brand.id != null || brand.id != undefined) {
        this.title = brand.brand;
        this.id_brand = brand.id;
        this.id_subdivision = null;
      } else {
        this.title = brand.sub;
        this.id_brand = null;
        this.id_subdivision = brand.id_subdivision;
      }
      this.getProducts();
    });  
  }

  getChosenTemplate() {
    this.storage.get('template').then(temp => {
      console.log(temp);
      if (temp.id_subdivision == undefined) {
        this.max_products = temp.max_products;
        this.numberOfProducts = temp.max_products;
      } else {
        this.max_products_subdivision = temp.max_products;
        this.max_products = temp.max_products - 1;
        this.numberOfProducts = temp.max_products - 1;
      }      
    });
  }

  getProducts() {
    this.subscription$.push(this.productsService.getProducts(this.id_brand, this.id_subdivision, this.page, this.search, this.relations_sub)
      .subscribe(resp => {
        resp.forEach(prod => this.products.push(prod));
        this.loaded = true;
      })
    );
  }

  searchProduct() {
    this.page = 1;
    this.products = [];
    this.index = [];
    this.getProducts();
  }

  lastIndex = -1;
  selectProduct(product, index) {
    let repeated = false;

    for (let i = 0; i < this.selectedProducts.length; i++) {
      if (product.id == this.selectedProducts[i].id) {
        this.selectedProducts.splice(i, 1);
        repeated = true;
      } 
    }
    
    for (let i = 0; i < this.index.length; i++) {
      if (index == this.index[i]) {
        this.index[i] = -1;
      } 
    }
    
    if (this.selectedProducts.length == this.max_products) {
      this.selectedProducts.pop();
      this.index[this.lastIndex] = -1;
    }

    if (!repeated && this.selectedProducts.length < this.max_products) {
      this.selectedProducts.push(product);
      this.index[index] = index;
      this.lastIndex = index;
    }

    if (this.selectedProducts.length == this.max_products) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }

  navEditor() {
    if (this.isSelected) {
      if (this.id_brand != null || this.id_brand != undefined) {
        this.storage.set('products', this.selectedProducts).then(() => {
          this.router.navigate(['editor']);
        });  
      } else if (this.max_products_subdivision == this.selectedProducts.length) {
        this.storage.set('products', this.selectedProducts).then(() => {
          this.router.navigate(['editor']);
        });
      } else {
        this.max_products = this.max_products_subdivision;
        this.relations_sub = this.selectedProducts[0].ref;
        this.page = 1;
        this.products = [];
        this.index = [];
        this.isSelected = false;
        this.getProducts();
      }
    } else {
      this.alertToast();
    }
  }

  async alertToast() {
    const toast = await this.toast.create({
      message: `Selecione até ${this.max_products} produtos !`,
      duration: 2000
    });
    toast.present();
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

  loadErrorImg(event) {
    event.target.src = 'assets/img/placeholder.png';
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe());
  }
}
