import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {

  prod: Product
  image_url = ''
  ref = ''

  constructor(private storage: Storage) {
    console.log('construtor')
    this.storage.get('prod').then(p => {
      this.prod = p
      this.image_url = this.prod.image_url
      this.ref = this.prod.ref
    })
  }

  ngOnInit() {
    console.log('ngOnInit')
  }
}
