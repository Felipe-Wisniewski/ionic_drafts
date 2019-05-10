import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsPaiMock = 'assets/mocks/products_pai.json';
  productsFilhoMock = 'assets/mocks/products_filho.json';
  private url = environment.URL_API + 'products';
  static pages;

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getProducts(id_brand, id_subdivision, page, search, relations) {
    let url;

    if (id_brand != null || id_brand != undefined) {
      if (search == "") {
        url = `${this.url}?id_brand=${id_brand}&page=${page}&size=30`
      } else {
        url = `${this.url}?id_brand=${id_brand}&page=${page}&search=${search}&size=30`
      } 
    } 

    if (id_subdivision != null || id_subdivision != undefined) {
      if (search == "") {
        // url = `${this.url}?id_brand=${id_subdivision}&page=${page}&size=30`
        url = this.productsPaiMock;
      } else {
        // url = `${this.url}?id_brand=${id_subdivision}&page=${page}&search=${search}&size=30`
        url = this.productsPaiMock;
      }
    }

    if (relations != "") {
      console.log(relations);
      if (search == "") {
        // url = `${this.url}?id_brand=${id_subdivision}&page=${page}&size=30`
        url = this.productsFilhoMock;
      } else {
        // url = `${this.url}?id_brand=${id_subdivision}&page=${page}&search=${search}&size=30`
        url = this.productsFilhoMock;
      }
    }
    console.log(url);
    return this.loadProducts(url);
  }

  private loadProducts(url) {
    return this.http.get<any[]>(url)
      .pipe(
        catchError(() => {
          this.presentAlert();
          return empty();
        }),
        tap(resp => ProductsService.pages = resp['pages']),
        map(resp => resp['products'])
      );
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Erro ao carregar as imagens.',
      buttons: ['OK']
    });
    await alert.present();
  }  
}