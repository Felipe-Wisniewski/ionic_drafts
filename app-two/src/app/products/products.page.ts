import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

import { ProductsService } from './products.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {

  title: string
  numberOfProducts: number
  id_brand: number
  id_subdivision: number

  index = []
  lastIndex = -1
  isSelected = false
  
  subscription$: Subscription[] = []
  loaded = false
  page = 1

  search = ""
  max_products: number
  max_products_subdivision: number
  relations_sub = ""
  products: Product[] = []
  selectedProducts = []
  
  constructor(private storage: Storage, 
    private productsService: ProductsService,
    private router: Router) { }

  ngOnInit() {
    this.getChosenBrand()
    this.getChosenTemplate()
  }

  getChosenBrand() {
    this.storage.get('brand').then(brand => {
      if (brand.id != null || brand.id != undefined) {
        this.title = brand.brand
        this.id_brand = brand.id
        this.id_subdivision = null

      } else {
        this.title = brand.sub
        this.id_brand = null
        this.id_subdivision = brand.id_subdivision
      }
      this.getProducts()
    })
  }

  getChosenTemplate() {
    this.storage.get('template').then(template => {
      if (template.id_subdivision == null || template.id_subdivision == undefined) {
        this.max_products = template.max_products
        this.numberOfProducts = template.max_products

      } else {
        this.max_products_subdivision = template.max_products
        this.max_products = template.max_products - 1
        this.numberOfProducts = template.max_products - 1
      }      
    })
  }

  getProducts() {
    this.subscription$.push(this.productsService.getProducts(this.id_brand, this.id_subdivision, this.page, this.search, this.relations_sub)
      .subscribe(resp => {
        resp.forEach(prod => this.products.push(prod))
        this.loaded = true
      })
    )
  }

  searchProduct() {
    this.page = 1
    this.products = []
    this.index = []
    this.getProducts()
  }
  
  selectProduct(product, index) {
    let repeated = false

    for (let i = 0; i < this.selectedProducts.length; i++) {
      if (product.id == this.selectedProducts[i].id) {
        this.selectedProducts.splice(i, 1)
        repeated = true
      } 
    }
    
    for (let i = 0; i < this.index.length; i++) {
      if (index == this.index[i]) {
        this.index[i] = -1
      } 
    }
    
    if (this.selectedProducts.length == this.max_products) {
      this.selectedProducts.pop()
      this.index[this.lastIndex] = -1
    }

    if (!repeated && this.selectedProducts.length < this.max_products) {
      this.selectedProducts.push(product)
      this.index[index] = index
      this.lastIndex = index
    }

    if (this.selectedProducts.length == this.max_products) {
      this.isSelected = true
    } else {
      this.isSelected = false
    }
  }

  openEditor() {
    if (this.isSelected) {
      if (this.id_brand != null || this.id_brand != undefined) {
        this.storage.remove('post')
        this.storage.set('products', this.selectedProducts).then(() => {
          this.router.navigate(['editor'])
        })
      
      } else if (this.max_products_subdivision == this.selectedProducts.length) {
        this.storage.remove('post')
        this.storage.set('products', this.selectedProducts).then(() => {
          this.router.navigate(['editor'])
        })
      
      } else {
        this.max_products = this.max_products_subdivision
        this.relations_sub = this.selectedProducts[0].ref
        this.page = 1
        this.products = []
        this.index = []
        this.isSelected = false
        this.getProducts()
      }
    
    } else {
      this.productsService.toast(`Selecione até ${this.max_products} produtos !`)
    }
  }

  loadMore(iScroll) {
    setTimeout(() => {
      if (this.page < ProductsService.pages) {
        this.page++
        this.getProducts()
      }
      
      iScroll.target.complete()
    }, 3500)
  }

  loadErrorImg(event) {
    event.target.src = 'assets/img/placeholder.png'
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe())
  }
}