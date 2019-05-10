import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  templatesMock = 'assets/mocks/templates.json';
  templatesMockSub = 'assets/mocks/templates_subs.json';
  private url: string = environment.URL_API + 'v2/templates';
  static pages;

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getTemplates(id_brand, id_subdivision, page) {
    let url;
    if (id_brand != null || id_brand != undefined) {
      // url = `${this.url}?id_brand=${id_brand}&page=${page}&id_lang=1&status=A`
      url = this.templatesMock;
    } else {
      // url = `${this.url}?id_subdivision=${id_subdivision}&page=${page}&id_lang=1&status=A`
      url = this.templatesMockSub;
    }
    return this.loadTemplates(url);
  }

  private loadTemplates(url) {
    console.log(`TemplatesService url - ${url}`);
    return this.http.get<any[]>(url)
      .pipe(
        catchError(() => {
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
