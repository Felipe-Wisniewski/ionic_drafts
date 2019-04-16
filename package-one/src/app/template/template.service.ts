import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private urlTemplates: string = environment.URL_API + 'v2/templates';
  // private templatesMock: string = 'assets/mocks/templates.json';
  // http://br-ws.calcadosbeirario.com.br/api/v2/ templates?id_brand=3&id_lang=1&status=A

  constructor(private http: HttpClient) { }

  getTemplates(id_brand: number/* , id_lang: number */) {
    return this.http.get<Object[]>(`${this.urlTemplates}?id_brand=${id_brand}&id_lang=1&status=A`);
  }
}
