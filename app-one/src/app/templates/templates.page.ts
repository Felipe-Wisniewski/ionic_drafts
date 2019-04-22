import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {

  cod_brand: string;

  subscription: Subscription;

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.getBrandId();
  }

  getBrandId() {
    this.storage.get('cod_brand').then((it) => {
      this.cod_brand = it;
    });
  }

}
