import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = environment.URL_API + 'products';
  static pages;

  constructor(private http: HttpClient) { }

  getProducts(id: string, page: number) {
    return this.http.get<Object[]>(`${this.url}?id_brand=${id}&page=${page}&size=30`)
      .pipe(
        tap(resp => ProductsService.pages = resp['pages']),
        map(resp => resp['products'])
      );
  }




  // http://br-ws.calcadosbeirario.com.br/api/products?id_brand=3&page=1&size=30

  //adicionar search
  // http://br-ws.calcadosbeirario.com.br/api/products?id_brand=3&search=221
  
}