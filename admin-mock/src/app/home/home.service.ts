import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError, tap } from 'rxjs/operators';
import { empty } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = environment.URL_API
  // private url = 'http://www.brpostefacil.com.br/homologacao/ws/public/api/'

  constructor(private http: HttpClient, private alertController: AlertController) { }

  login(user: string, psw: string) {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Cache-Control', 'no-cache')

    let options = {
      headers: httpHeaders
    }

    return this.http.post(`${this.url}admin-login`, { username: user, password: psw }, options)
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
