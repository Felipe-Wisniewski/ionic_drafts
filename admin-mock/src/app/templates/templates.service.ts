import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Template } from './../model/template';
import { Brand } from '../model/brand';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  url = environment.URL_API

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  }

  static pages

  constructor(private http: HttpClient, private alertController: AlertController) { }


  getTemplates(filters, page) {
    let url = ''

    if (filters != null)
      url = `${this.setFilters(filters)}page=${page}&size=40`
    else
      url = `${environment.URL_API}templates?page=${page}&size=40`

    return this.http.get<Template[]>(url)
      .pipe(
        catchError((err) => {
          console.error(err)
          this.alertPopup('Ocorreu um erro ao carregar os templates.')
          return empty()
        }),
        tap(resp => TemplatesService.pages = resp['pages']),
        map(resp => resp['templates'])
      )
  }

  setFilters(filters): string {
    let filter = ''

    if (filters.brandsFilter != null) {
      filters.brandsFilter.forEach((b) => {
        filter += `id_brand=${b}&`
      })
    }

    if (filters.languagesFilter != null) {
      filters.languagesFilter.forEach((l) => {
        filter += `id_lang=${l}&`
      })
    }

    if (filters.layouts.post) filter += `layout=post&`

    if (filters.layouts.story) filter += `layout=story&`

    if (filters.status.ativo) filter += `status=A&`

    if (filters.status.inativo) filter += `status=I&`

    return `${environment.URL_API}templates?${filter}`
  }

  getTemplate(id_template) {
    return this.http.get<Template>(`${this.url}templates/${id_template}`)
      .pipe(
        catchError((err) => {
          console.error(err)
          this.alertPopup('Ocorreu um erro ao carregar o template.')
          return empty()
        }),
        map(resp => resp['template'])
      )
  }

  saveTemplate(template: Template) {
    let params = {
      id_brand: +template.id_brand,
      id_lang: template.id_lang,
      name: template.name,
      thumbnail: template.thumbnail,
      layout: template.layout,
      id_subdivision: +template.id_subdivision,
      max_products: +template.max_products,
      validity_period_start: template.validity_period_start,
      validity_period_end: template.validity_period_end,
      json: template.json
    }
    return this.http.post(`${this.url}templates`, params)
      .pipe(
        catchError(() => {
          this.alertPopup("Erro ao salvar o template.")
          return empty()
        }),
        map(resp => resp['messages'])
      )
  }

  putTemplate(template: Template) {
    let params = {
      json: JSON.stringify(template.json),
      id_brand: +template.id_brand,
      id_lang: template.id_lang
    }
    return this.http.put(`${this.url}templates/${template.id_template}`, params)
      .pipe(
        catchError((err) => {
          console.log(err)
          this.alertPopup('Ocorreu um erro ao atualizar o template.')
          return empty()
        }),
        tap(resp => console.log(resp))
      )
  }

  disableTemplate(template: Template) {
    console.log(template)
    return this.http.delete(`${this.url}templates/${template.id_template}`)
      .pipe(
        catchError((err) => {
          console.error(err)
          this.alertPopup('Ocorreu um erro ao deletar o template.')
          return empty()
        }),
        tap((r) => console.log(r))
      )
  }

  enableTemplate(template: Template) {
    console.log(template)
  }

  getBrands() {
    return this.http.get<Brand[]>(`${this.url}brands`)
      .pipe(
        catchError((err) => {
          console.error(err)
          this.alertPopup('Ocorreu um erro ao carregar as marcas.')
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