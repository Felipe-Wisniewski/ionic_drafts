import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

import { Product } from '../model/product';

const API_URL = 'http://br-ws.calcadosbeirario.com.br/api/products'
const CACHE_SIZE = 1

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private prodCache$: Observable<Array<Product>>

  constructor(private http: HttpClient) { }

  get products() {
    if (!this.prodCache$) {
      this.prodCache$ = this.requestProducts().pipe(
        shareReplay(CACHE_SIZE)
      )
    }
    return this.prodCache$
  }

  private requestProducts() {
    return this.http.get<Array<Product>>(API_URL).pipe(
      map(resp => resp['products'])
    )
  }
}
