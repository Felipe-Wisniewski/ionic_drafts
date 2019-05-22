import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-templates-posts',
  templateUrl: './templates-posts.page.html',
  styleUrls: ['./templates-posts.page.scss'],
})
export class TemplatesPostsPage implements OnInit {

  title: string
  logo: string
  loaded = false

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.getBrand()
  }

  getBrand() {
    this.storage.get('brand').then(brand => {
      this.title = brand.brand
      this.logo = brand.logo_url
      this.loaded = true
    })
  }
}
