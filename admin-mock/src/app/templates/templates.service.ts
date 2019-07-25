import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Template } from './../model/template';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Brand } from '../model/brand';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  url = environment.URL_API
  static pages

  constructor(private http: HttpClient, private alertController: AlertController) { }

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

  getTemplate(id_template) {
    return this.http.get<Template>(`${this.url}templates/${id_template}`)
      .pipe(
        catchError((err) => {
          console.error(err)
          return empty()
        }),
        map(resp => resp['template'])
      )
  }

  putTemplate(template: Template) {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
      })
    }

    return this.http.put(`${this.url}templates/${template.id_template}`, template, httpOptions)
      .pipe(
        catchError((err) => {
          console.error(err)
          return empty()
        }),
        tap(resp => console.log(resp))
      )
  }

  getBrands() {
    return this.http.get<Brand[]>(`${this.url}brands`)
      .pipe(
        catchError((err) => {
          console.error(err)
          return empty()
        }),
        map(resp => resp['brands'])
      )
  }

  async alertPopup(message: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: message,
      buttons: ['OK']
    })
    await alert.present()
  }
}

