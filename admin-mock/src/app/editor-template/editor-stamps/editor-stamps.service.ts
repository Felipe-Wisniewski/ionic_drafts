import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { Template } from 'src/app/model/template';
import { LanguageService } from 'src/app/shared/language.service';

@Injectable({
  providedIn: 'root'
})
export class EditorStampsService {

  private url = environment.URL_API
  static pages

  constructor(private http: HttpClient, private lang: LanguageService, private alertController: AlertController) { }

  getStamps(template: Template) {
    return this.http.get<any[]>(`${this.url}stamps?id_brand=${template.id_brand}&lang=${this.lang.getInitialsById(template.id_lang)}`)
      .pipe(
        catchError(() => {
          this.alertPopup("Erro ao carregar as estampas.")
          return empty()
        }),
        map(resp => resp['stamps'])
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
