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
  //http://br-ws.calcadosbeirario.com.br/api/v2/templates?id_brand=3&page=1&id_lang=1&status=A
  private url: string = environment.URL_API + 'v2/templates';

  constructor(private http: HttpClient) { }

  getTemplates(id_brand: number, id_sub: number) {
    if (id_sub == null || id_sub == undefined) {
      return this.getTemplatesBrands(id_brand);
    } else {
      return this.getTemplatesSubBrands(id_brand, id_sub);
    }
  }

  getTemplatesBrands(id_brand: number) {
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

  getTemplatesSubBrands(id_brand: number, id_sub: number) {
    return this.http.get<any[]>('assets/mocks/templates_subs.json')
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
