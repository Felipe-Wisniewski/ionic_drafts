import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = 'http://10.1.1.153:9090/api/'

  constructor(private http: HttpClient) { }

  getBrandsLogos(id_brand) {
    return this.http.get(`${this.url}brands/${id_brand}/logos`)
    .pipe(
      catchError(() => {
        return empty()
      }),
      map(resp => resp['logos'])
    )
  }

  getUserLogos() {

  }

  getStamps(id_brand) {
    return this.http.get<any[]>(`${this.url}stamps?id_brand=${id_brand}&lang=en`)
      .pipe(
        catchError(() => {
          return empty()
        }),
        map(resp => resp['stamps'])
      )
  }

  getIcons(id_brand) {
    return this.http.get<any[]>(`${this.url}icons?id_brand=${id_brand};98&lang=pt`)
      .pipe(
        catchError(() => {
          return empty()
        }),
        map(resp => resp['icons'])
      )
  }
}
