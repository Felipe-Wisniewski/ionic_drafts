import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Feed } from './feed';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private url = `${environment.URL_API}feed`;

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getFeed() {
    return this.http.get<Feed[]>(this.url)
      .pipe(
        catchError(() => {
          this.presentAlert();
          return empty();
        })
      );
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Erro ao carregar o feed, tente novamente mais tarde.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
