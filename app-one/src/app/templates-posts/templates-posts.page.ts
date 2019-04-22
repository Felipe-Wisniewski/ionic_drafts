import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-templates-posts',
  templateUrl: './templates-posts.page.html',
  styleUrls: ['./templates-posts.page.scss'],
})
export class TemplatesPostsPage implements OnInit {

  desc_brand: string;
  logo_brand: string;

  constructor(private storage: Storage) { }

  ngOnInit(): void {
    this.getLogoBrand();
  }

  getLogoBrand() {
    this.storage.get('brand').then((it) => {
      this.logo_brand = it.logo_brand;
      this.desc_brand = it.desc_brand;
    });
  }
}
