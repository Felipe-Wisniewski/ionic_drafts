import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  private urlTemplates: string = environment.URL_API  + 'v2/templates';
  private templatesMock: string = 'assets/mocks/templates.json';

  private url: string =  this.templatesMock;

  constructor(private http: HttpClient) { }

  //filtro id_lang
  /* getTemplates(id: string) {
    return this.http.get<Object[]>(`${this.url}?id_brand=${id}&id_lang=1&status=A`)
      .pipe(
        map(resp => resp['templates'])
      );
  } */
  getTemplates(id: string) {
    return this.http.get<Object[]>(this.url)
      .pipe(
        delay(2000),
        map(resp => resp['templates'])
      );
  }
  //http://br-ws.calcadosbeirario.com.br/api/v2/templates?id_brand=3&id_lang=1&status=A
}
