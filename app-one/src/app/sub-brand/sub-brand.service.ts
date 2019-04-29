import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { catchError, map } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubBrandService {

  // subBrandsMock = 'assets/mocks/sub_brands.json'

  constructor(private http: HttpClient, private alertController: AlertController) { }

  // request para api enviando o id_brand e retornando as sub_brands
  getSubBrands(id: number) {
    return this.http.get<any[]>('assets/mocks/sub_brands.json')
      .pipe(
        catchError(error => {
          console.error(error);
          this.presentAlert();
          return empty();
        }),
        map(resp => resp['sub_brands'])
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
