import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { empty } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Post } from './post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url: string =  environment.URL_API  + 'posts';  
  static pages;

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getPosts(id_brand, id_subdivision, page, search) {
    let url;
    if (id_brand != null || id_brand != undefined) {
      if (search == "") {
        url = `${this.url}?id_brand=${id_brand}&order=DESC&page=${page}&size=30&sort=DATA_INCLUSAO_ALTERACAO`;
      } else {
        url = `${this.url}?id_brand=${id_brand}&order=DESC&page=${page}&search=${search}&sort=DATA_INCLUSAO_ALTERACAO`;
      } 
    } else {
      if (search == "") {
        url = `${this.url}?id_subdivision=${id_subdivision}&order=DESC&page=${page}&size=30&sort=DATA_INCLUSAO_ALTERACAO`;
      } else {
        url = `${this.url}?id_subdivision=${id_subdivision}&order=DESC&page=${page}&search=${search}&sort=DATA_INCLUSAO_ALTERACAO`;
      }
    }
    return this.loadPosts(url);
  }

  private loadPosts(url) {
    return this.http.get<Post[]>(url)
      .pipe(
        catchError(error => {
          console.error(error);
          this.presentAlert();
          return empty();
        }),
        tap(resp => PostsService.pages = resp['pages']),
        map(resp => resp['posts'])
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
