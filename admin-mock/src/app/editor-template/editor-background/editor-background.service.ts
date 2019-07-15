import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditorBackgroundService {

  private url = environment.URL_API
  static pages
  lang = 'pt'

  constructor(private http: HttpClient, private alertController: AlertController) { }

  // TODO LAYOUT
  getBackGroundImages(id_brand, layout, page) {
    return this.http.get(`${this.url}background-images?id_brand=${id_brand}&lang=${this.lang}&size=30&page=${page}`)
      .pipe(
        catchError(() => {
          this.alertPopup("Erro ao carregar as imagens!")
          return empty()
        }),
        tap(resp => EditorBackgroundService.pages = resp['pages']),
        map(resp => resp['backgroundimages'])
      )
  }

  getBackGroundImagesSubdvision(id_subdivision, layout, page) {
    return this.http.get(`${this.url}background-images?id_brand=${id_subdivision}&lang=${this.lang}&size=30&page=${page}`)
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
