import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = 'http://localhost'
  static pages

  constructor(private http: HttpClient) { }

  getTemplates(id_brand, id_subdivision, layout, page) {
    let url

    if (id_brand != null || id_brand != undefined) {
      // TEMPLATE BRAND
      layout == 'post' ? url = `${this.url}:3000/post` : url = `${this.url}:3001/story`
      // url = `${this.url}?id_brand=${id_brand}&layout=${layout}&page=${page}&id_lang=1&status=A&valid=true`

    } else {
      // TEMPLATE SUBDIVISION
      layout == 'post' ? url = `${this.url}:3000/post` : url = `${this.url}:3001/story`
      // url = `${this.url}?id_subdivision=${id_subdivision}&layout=${layout}&page=${page}&id_lang=3&status=A&valid=true`
    }
    return this.loadTemplates(url)
  }

  private loadTemplates(url) {
    return this.http.get<any[]>(url)
      .pipe(
        catchError(() => {
          console.log("Erro ao carregar os templates.")
          return empty()
        }),
        map((resp) => { return resp })
      )
  }

  toast(message: string) {
    console.log(message)
  }
}
