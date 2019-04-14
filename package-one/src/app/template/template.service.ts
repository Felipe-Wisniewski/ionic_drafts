import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private urlTemplates: string = environment.URL_API + 'templates';
  private templatesMock: string = 'assets/mocks/templates.json';
  
  private url: string = this.templatesMock;

  constructor(private http: HttpClient) { }

  getTemplates() {
    return this.http.get(this.url);
  }
}
