import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { Template } from 'src/app/model/template';

@Injectable({
  providedIn: 'root'
})
export class EditorTemplateService {

  private url = environment.URL_API
  lang = 'pt'

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getTemplate(id_template) {
    return this.http.get(`${this.url}templates/${id_template}`)
      .pipe(
        catchError(() => {
          this.alertPopup("Erro ao carregar template")
          return empty()
        }),
        map(resp => resp['template'])
      )
  }

  getIcons(id_brand) {
    return this.http.get(`${this.url}icons?id_brand=${id_brand};98&lang=${this.lang}`)
      .pipe(
        catchError(() => {
          this.alertPopup("Erro ao carregar os icones")
          return empty()
        }),
        map(resp => resp['icons'])
      )
  }

  saveTemplate(template: Template) {
    let params = {
      id_brand: template.id_brand,
      id_subdivision: template.id_subdivision,
      name: template.name,
      id_lang: template.id_lang,
      layout: template.layout,
      max_products: template.max_products,
      json: template.json,
      thumbnail: template.thumbnail,
      validity_period_start: template.validity_period_start,
      validity_period_end: template.validity_period_end
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary8RrgaZuI2h3MZqQd',
        'Cache-Control': 'no-cache'
      })
    }

    console.log(`${this.url}templates`)

    return this.http.post(`${this.url}templates`, params, httpOptions)
      .pipe(
        catchError(() => {
          this.alertPopup("Erro ao salvar o template.")
          return empty()
        }),
        map(resp => resp['messages'])
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