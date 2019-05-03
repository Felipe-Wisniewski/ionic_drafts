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

  private url = environment.URL_API + 'products';
  static pages;

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getProducts(id_brand: number, id_sub: number, page: number, search: string) {
    if (id_sub == null || id_sub == undefined) {
      if (search == "") {
        return this.loadProducts(id_brand, page);
      } else {
        return this.searchProducts(id_brand, page, search);
      } 
      
    } else {
      if (search == "") {
        return this.loadProductsSubBrand(id_sub, page);
      } else {
        return this.searchProductsSubBrand(id_sub, page, search);
      }
    }
  }

  private loadProducts(id_brand: number, page: number) {
    return this.http.get<any[]>(`${this.url}?id_brand=${id_brand}&page=${page}&size=30`)
      .pipe(
        catchError(error => {
          console.error(error);
          this.presentAlert();
          return empty();
        }),
        tap(resp => ProductsService.pages = resp['pages']),
        map(resp => resp['products'])
      );
  }

  private searchProducts(id_brand: number, page: number, search: string) {
    return this.http.get<any[]>(`${this.url}?id_brand=${id_brand}&page=${page}&search=${search}`)
      .pipe(
        catchError(error => {
          console.error(error);
          this.presentAlert();
          return empty();
        }),
        tap(resp => ProductsService.pages = resp['pages']),
        map(resp => resp['products'])
      );
  }

//desenvolver - aguardando api
  private loadProductsSubBrand(id_sub, page) {
    return this.http.get<any[]>('assets/mocks/products.json')
    .pipe(
      catchError(error => {
        console.error(error);
        this.presentAlert();
        return empty();
      }),
      tap(resp => ProductsService.pages = resp['pages']),
      map(resp => resp['products'])
    );
  }
  
//desenvolver - aguardando api
  private searchProductsSubBrand(id_sub, page, search) {
    return this.http.get<any[]>('assets/mocks/products.json')
    .pipe(
      catchError(error => {
        console.error(error);
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