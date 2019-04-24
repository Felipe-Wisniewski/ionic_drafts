import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urlProducts = environment.URL_API + 'products';
  private url = this.urlProducts;

  pages = 0;

  constructor(private http: HttpClient) { }

  getProducts(id: string, page: number) {
    if (page == this.pages) {
      return null;
    }
    return this.http.get<Object[]>(`${this.url}?id_brand=${id}&page=${page}&size=30`)
      .pipe(
        tap(resp => this.pages = resp['pages']),
        map(resp => resp['products'])
      );
  }
  // http://br-ws.calcadosbeirario.com.br/api/products?id_brand=3&page=1&size=30
}
