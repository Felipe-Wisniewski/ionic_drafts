import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.URL_API
  
  redirectUrl: string
  isLoggedIn = false

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }

  // VERIFICAR PQ O SERVIDOR NOVO NÃO FUNCIONA O LOGIN!!!
  login(user: string, psw: string) {
    return this.http.post(`${this.url}admin-login`, { username: user, password: psw })
      .pipe(
        tap((resp: any) => {
          resp.status === "success" ? this.isLoggedIn = true : this.isLoggedIn = false
        }),
        catchError(() => {
          this.alertPopup(`Ocorreu um erro ao realizar o login, verifique se o seu usuário ou senha estão corretos.`)
          return empty()
        })
      )
  }

  /* logout() {
    this.isLoggedIn = false
    this.router.navigate([''])
  } */

  async alertPopup(message: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: message,
      buttons: ['OK']
    })
    await alert.present()
  }
}