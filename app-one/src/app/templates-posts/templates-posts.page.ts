import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Brand } from './../home/brand';

@Component({
  selector: 'app-templates-posts',
  templateUrl: './templates-posts.page.html',
  styleUrls: ['./templates-posts.page.scss'],
})
export class TemplatesPostsPage {

  title: string;
  logo: string;

  constructor(private storage: Storage) { 
    this.storage.get('brand').then((brand) => {
      this.logo = brand.logo_url;
      this.title = brand.brand;
    });
  }
}
