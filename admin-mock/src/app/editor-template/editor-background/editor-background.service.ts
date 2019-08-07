import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Template } from 'src/app/model/template';
import { LanguageService } from 'src/app/shared/language.service';

@Injectable({
  providedIn: 'root'
})
export class EditorBackgroundService {

  private url = environment.URL_API
  static pages

  constructor(private http: HttpClient, private lang: LanguageService, private alertController: AlertController) { }

  // -------- TODO LAYOUT - &layout=story ---------
  getBackGroundImages(template: Template, page: number) {
    let urlBg

    if (template.id_subdivision == null)
      urlBg = `${this.url}background-images?id_brand=${template.id_brand}&lang=${this.lang.getInitialsById(template.id_lang)}&size=30&page=${page}`
    else
      urlBg = `${this.url}background-images?id_brand=${template.id_subdivision}&lang=${this.lang.getInitialsById(template.id_lang)}&size=30&page=${page}`

    return this.http.get(urlBg)
      .pipe(
        catchError(() => {
          this.alertPopup("Erro ao carregar as imagens!")
          return empty()
        }),
        tap(resp => EditorBackgroundService.pages = resp['pages']),
        map(resp => resp['backgroundimages'])
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
