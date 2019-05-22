import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Brand } from '../model/brand';
import { Template } from '../model/template';
import { Post } from '../model/post';
import { Product } from '../model/product';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  brand: Brand
  template: Template
  products: Product[]
  post: Post

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.getChoose()
  }

  getChoose() {
    this.storage.forEach((value, key, n) => {
      switch(key) {
        case 'brand': {
          this.brand = value
          break
        }

        case 'template': {
          this.template = value
          break
        }

        case 'products': {
          this.products = value
          break
        }

        case 'post': {
          this.post = value
          break
        }
      }
    }).then(() => {
      if (this.template == null || this.template == undefined) {
        console.log(`this is a post`)
      } else {
        console.log(`this is a template`)
      }
    })
  }
}
