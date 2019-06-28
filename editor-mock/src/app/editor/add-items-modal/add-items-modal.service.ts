import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { catchError, map } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddItemsModalService {

  url = 'http://localhost:3000/'
  id_brand: string

  constructor(private storage: Storage, private http: HttpClient) {
    this.storage.get('brand').then((b) => {
      this.id_brand = b.id
    })
  }

  getBrandsLogos() {
    /* return this.http.get(`${this.url}brands/${this.id_brand}/logos`)
    .pipe(
      catchError(() => {
        return empty()
      }),
      map(resp => resp['logos'])
      ) */
    return this.http.get<any[]>(`${this.url}logos`)
  }

  getUserLogos() {
    //gallery
  }

  getStamps() {
    /* return this.http.get<any[]>(`${this.url}stamps?id_brand=${this.id_brand}&lang=en`)
    .pipe(
      catchError(() => {
        return empty()
      }),
      map(resp => resp['stamps'])
      ) */
    return this.http.get<any[]>(`${this.url}stamps`)
  }

  getIcons() {
    /* return this.http.get<any[]>(`${this.url}icons?id_brand=${this.id_brand};98&lang=pt`)
    .pipe(
      catchError(() => {
        return empty()
      }),
      map(resp => resp['icons'])
      ) */
    return this.http.get<any[]>(`${this.url}icons`)
  }
}
