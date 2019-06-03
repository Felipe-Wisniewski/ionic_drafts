import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { empty } from 'rxjs';

import { AlertsService } from '../shared/alerts.service';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = `${environment.URL_API}products`
  static pages

  constructor(private http: HttpClient, private alerts: AlertsService) { }

  getProducts(id_brand, id_subdivision, page, search, relations) {
    let url

    if (id_brand != null || id_brand != undefined) {
      if (search == "") {
        url = `${this.url}?id_brand=${id_brand}&page=${page}&size=30`

      } else {
        url = `${this.url}?id_brand=${id_brand}&page=${page}&search=${search}&size=30`
      } 
    } 

    if (id_subdivision != null || id_subdivision != undefined) {
      if (search == "") {
        url = `${this.url}?id_subdivision=${id_subdivision}&page=${page}&size=30`
      
      } else {
        url = `${this.url}?id_subdivision=${id_subdivision}&page=${page}&search=${search}&size=30`
      }
    }

    if (relations != "") {
      if (search == "") {
        url = `${this.url}?relations=${relations}&page=${page}&size=30`

      } else {
        url = `${this.url}?relations=${relations}&page=${page}&search=${search}&size=30`
      }
    }
    return this.loadProducts(url)
  }

  private loadProducts(url) {
    return this.http.get<Product[]>(url)
      .pipe(
        catchError(() => {
          this.alerts.alertPopup('Erro ao carregar as imagens.')
          return empty()
        }),
        tap(resp => ProductsService.pages = resp['pages']),
        map(resp => resp['products'])
      )
  }
  
  toast(message: string) {
    this.alerts.alertToast(message)
  }
}