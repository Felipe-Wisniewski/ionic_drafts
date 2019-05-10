import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Brand } from '../home/brand';
import { Post } from '../posts/post';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  brand: Brand;
  template: any;
  products: any;
  post: Post;

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.getChoose();
  }

  getChoose() {
    this.storage.get('brand').then(brand => {
      console.log(brand);
      this.brand = brand;
    });

    this.storage.get('template').then(template => {
      console.log(template);
      this.template = template;
    });

    this.storage.get('products').then(products => {
      console.log(products);
      this.products = products
    });

    this.storage.get('post').then(post => {
      console.log(post);
      this.post = post;
    });
  }
}
