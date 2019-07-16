import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EditorStampsService {

  private url = environment.URL_API
  static pages

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getStamps(id_brand, lang) {
    return this.http.get<any[]>(`${this.url}stamps?id_brand=${id_brand}&lang=pt`)
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
