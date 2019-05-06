import { Feed } from './feed';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { catchError, map } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  url: string = `${environment.URL_API}feed`;

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getFeed() {
    return this.http.get<Feed[]>(this.url)
      .pipe(
        catchError(error => {
          console.error(error);
          this.presentAlert();
          return empty();
        })
      );
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Erro ao carregar as imagens.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
