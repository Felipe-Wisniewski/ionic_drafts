import { Brand } from './brand';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { empty } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  // brandsMock = 'assets/mocks/brands.json';
  private url: string =  environment.URL_API  + 'brands';

  constructor(private http: HttpClient, private storage: Storage, private alertController: AlertController) { }

  getBrands() {
    return this.http.get<Brand[]>('assets/mocks/brands.json')
      .pipe(
        catchError(error => {
          console.error(error);
          this.presentAlert();
          return empty();
        }),
        map(resp => resp['brands'])
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