import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, tap, delay, catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  // templatesMock = 'assets/mocks/templates.json';
  private url: string = environment.URL_API + 'v2/templates';

  constructor(private http: HttpClient) { }

  //tipar retorno
  /* getTemplates(id: string, page: number) {
    return this.http.get<Object[]>(`${this.url}?id_brand=${id}&page=${page}&id_lang=1&status=A`)
      .pipe(
        map(resp => resp['templates'])
      );
  } */
  //http://br-ws.calcadosbeirario.com.br/api/v2/templates?id_brand=3&page=1&id_lang=1&status=A

  getTemplates(id: number) {
    return this.http.get<any[]>('assets/mocks/templates.json')
      .pipe(
        catchError(error => {
          console.error(error);
          return empty();
        }),
        delay(2000),
        map(resp => resp['templates'])
      );
  }
}
