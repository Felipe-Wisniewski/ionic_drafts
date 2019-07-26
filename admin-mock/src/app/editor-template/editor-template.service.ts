import { Template } from 'src/app/model/template';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { catchError, map, tap } from 'rxjs/operators';
import { empty } from 'rxjs';

import { environment } from 'src/environments/environment.prod';

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

  saveTemplate(template: Template) {

  // TODO HTTP PARAMS

    return this.http.post(``, 'PARAMS', 'HEADER')
      .pipe(
        catchError(() => {
          this.alertPopup("Erro ao salvar o template.")
          return empty()
        })
      ),
      tap(r => console.log(r))
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

  async alertPopup(message: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: message,
      buttons: ['OK']
    })
    await alert.present()
  }
}
