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

  // postsMock = 'assets/mocks/posts.json';
  private url: string =  environment.URL_API  + 'posts';  
  static pages;

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getPosts(id_brand: number, id_sub: number, page: number, search: string) {
    if (id_sub == null || id_sub == undefined) {
      if (search == "") {
        return this.loadPostsBrand(id_brand, page);
      } else {
        return this.searchPostsBrand(id_brand, page, search);
      } 
      
    } else {
      if (search == "") {
        return this.loadPostsSubBrand(id_brand, id_sub, page);
      } else {
        return this.searchPostsSubBrand(id_brand, id_sub, page, search);
      }
    }
  }

  private loadPostsBrand(id_brand: number, page: number) {
    return this.http.get<Post[]>(`${this.url}?id_brand=${id_brand}&order=DESC&page=${page}&size=30&sort=DATA_INCLUSAO_ALTERACAO`)
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

  private searchPostsBrand(id_brand: number, page: number, search: string) {
    return this.http.get<Post[]>(`${this.url}?id_brand=${id_brand}&order=DESC&page=${page}&search=${search}&sort=DATA_INCLUSAO_ALTERACAO`)
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

  private loadPostsSubBrand(id_brand: number, id_sub: number, page: number) {
    return this.http.get<Post[]>(`${this.url}?id_brand=${id_brand}&order=DESC&page=${page}&size=30&sort=DATA_INCLUSAO_ALTERACAO`)
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

  private searchPostsSubBrand(id_brand: number, id_sub: number, page: number, search: string) {
    return this.http.get<Post[]>(`${this.url}?id_brand=${id_brand}&order=DESC&page=${page}&search=${search}&sort=DATA_INCLUSAO_ALTERACAO`)
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
