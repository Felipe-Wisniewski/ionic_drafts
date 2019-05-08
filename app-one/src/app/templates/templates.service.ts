import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, tap, delay, catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  templatesMock = 'assets/mocks/templates_subs.json';
  private url: string = environment.URL_API + 'v2/templates';
  static pages;

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getTemplates(id_brand, id_subdivision, page) {
    let url;
    if (id_brand != null || id_brand != undefined) {
      url = `${this.url}?id_brand=${id_brand}&page=${page}&id_lang=1&status=A`
    } else {
      // url = `${this.url}?id_subdivision=${id_subdivision}&page=${page}&id_lang=1&status=A`
      url = this.templatesMock;
    }
    return this.loadTemplates(url);
  }

  private loadTemplates(url) {
    return this.http.get<any[]>(url)
      .pipe(
        catchError(error => {
          console.error(error);
          this.presentAlert();
          return empty();
        }),
        tap(resp => TemplatesService.pages = resp['pages']),
        map(resp => resp['templates'])
      );
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Erro ao carregar os templates.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
