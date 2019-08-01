import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = environment.URL_API

  constructor(private http: HttpClient, private alertController: AlertController) { }

  // VERIFICAR PQ O SERVIDOR NOVO NÃO FUNCIONA O LOGIN!!!
  login(user: string, psw: string) {
    return this.http.post(`http://www.brpostefacil.com.br/homologacao/ws/public/api/admin-login`, { username: user, password: psw })
      .pipe(
        catchError((e) => {
          this.alertPopup("Erro ao realizar login")
          console.error(e)
          return empty()
        }),
        tap(resp => console.log(resp))
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