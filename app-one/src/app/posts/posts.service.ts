import { Post } from './post';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private urlBrands: string = environment.URL_API  + 'posts';
  private postsMock: string = 'assets/mocks/posts.json';

  private url: string =  this.urlBrands;

  constructor(private http: HttpClient) { }

  getPosts(id) {
    return this.http.get<Post[]>(`${this.url}?id_brand=${id}`)
      .pipe(
        map(resp => resp['posts'])
      );
  }
  //http://br-ws.calcadosbeirario.com.br/api/posts?id_brand=3
}
