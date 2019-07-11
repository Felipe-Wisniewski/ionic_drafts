import { Injectable } from '@angular/core';
import { empty } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Template } from './../model/template';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../model/brand';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  static pages

  constructor(private http: HttpClient) { }

  getTemplates(page) {
    /* return this.http.get<Template[]>(`${environment.URL_API}templates?page=${page}&size=50`)
      .pipe(
        catchError((err) => {
          console.error(err)
          return empty()
        }),
        tap(resp => TemplatesService.pages = resp['pages']),
        map(resp => resp['templates'])
      ) */
      return this.http.get<Template[]>('http://localhost:3000/templates')
  }

  getBrands() {
    return this.http.get<Brand[]>(`${environment.URL_API}brands`)
      .pipe(
        catchError((err) => {
          console.error(err)
          return empty()
        }),
        map(resp => resp['brands'])
      )
  }
}
