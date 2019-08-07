import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { Template } from 'src/app/model/template';

@Injectable({
  providedIn: 'root'
})
export class EditorIconsModalService {

  private url = environment.URL_API
  static pages

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getIcons(template: Template) {
    return this.http.get<any[]>(`${this.url}icons?id_brand=${template.id_brand};98`) //&lang=${this.lang.getLanguageById(template.id_lang)}
      .pipe(
        catchError(() => {
          this.alertPopup("Erro ao carregar os ícones.")
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