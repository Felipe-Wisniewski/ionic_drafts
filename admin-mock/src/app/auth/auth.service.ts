import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  isLoggedIn = true // TROCAR PARA FALSE !!!!!!!

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }

  login(user: string, psw: string) {
    let params = { username: user, password: psw }

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }), withCredentials: true
    }
    return this.http.post(`${this.url}admin-login`, params, httpOptions)
      .pipe(
        tap((resp: any) => {
          
          if (resp.status === "success") {
            this.isLoggedIn = true
            localStorage.setItem('id_token', resp.data)
          } else {
            this.isLoggedIn = false
            localStorage.setItem('id_token', '')
          }
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