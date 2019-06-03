import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { empty } from 'rxjs';

import { Template } from './../model/template';
import { environment } from 'src/environments/environment';
import { AlertsService } from '../shared/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  private url = `${environment.URL_API}templates`
  static pages

  constructor(private http: HttpClient, private alerts: AlertsService) { }

  getTemplates(id_brand, id_subdivision, layout, page) {
    let url

    if (id_brand != null || id_brand != undefined) {
      url = `${this.url}?id_brand=${id_brand}&layout=${layout}&page=${page}&id_lang=1&status=A&valid=true`

    } else {
      url = `${this.url}?id_subdivision=${id_subdivision}&layout=${layout}&page=${page}&id_lang=3&status=A&valid=true`
    }
    return this.loadTemplates(url)
  }

  private loadTemplates(url) {
    return this.http.get<Template[]>(url)
      .pipe(
        catchError(() => {
          this.alerts.alertPopup("Erro ao carregar os templates.")
          return empty()
        }),
        tap(resp => TemplatesService.pages = resp['pages']),
        map(resp => resp['templates'])
      )
  }

  toast(message: string) {
    this.alerts.alertToast(message)
  }
}