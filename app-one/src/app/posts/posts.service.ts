import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Post } from './post';
import { environment } from '../../environments/environment';
import { AlertsService } from '../shared/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url: string =  environment.URL_API  + 'posts';  
  static pages;

  constructor(private http: HttpClient, private alert: AlertsService) { }

  getPosts(id_brand, id_subdivision, layout, page, search) {
    let url;
    if (id_brand != null || id_brand != undefined) {
      if (search == "") {
        url = `${this.url}?id_brand=${id_brand}&layout=${layout}&order=DESC&page=${page}&size=30&sort=DATA_INCLUSAO_ALTERACAO`;
      } else {
        url = `${this.url}?id_brand=${id_brand}&layout=${layout}&order=DESC&page=${page}&search=${search}&sort=DATA_INCLUSAO_ALTERACAO`;
      } 
    } else {
      if (search == "") {
        url = `${this.url}?id_subdivision=${id_subdivision}&layout=${layout}&order=DESC&page=${page}&size=30&sort=DATA_INCLUSAO_ALTERACAO`;
      } else {
        url = `${this.url}?id_subdivision=${id_subdivision}&layout=${layout}&order=DESC&page=${page}&search=${search}&sort=DATA_INCLUSAO_ALTERACAO`;
      }
    }
    return this.loadPosts(url);
  }

  private loadPosts(url) {
    return this.http.get<Post[]>(url)
      .pipe(
        catchError(() => {
          this.alertError();
          return empty();
        }),
        tap(resp => PostsService.pages = resp['pages']),
        map(resp => resp['posts'])
      );
  }

  toast() {
    this.alert.alertToast("Selecione uma imagem !");
  }

  private alertError() {
    this.alert.alertPopup("Erro ao carregar as imagens.");
  }

}
