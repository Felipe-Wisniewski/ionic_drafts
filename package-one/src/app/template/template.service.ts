import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { TemplatesResponse } from './template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private urlTemplates: string = environment.URL_API + 'templates';
  private templatesMock: string = 'assets/mocks/templates.json';
  private url: string = this.urlTemplates;

  constructor(private http: HttpClient) { }

  getTemplates(page: number) {
    return this.http.get(`${this.url}?page=${page}`);
  }
}
