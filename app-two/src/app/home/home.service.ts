import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Brand } from '../model/brand';
import { AlertsService } from '../shared/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
 
  private url = `${environment.URL_API}brands`

  constructor(private http: HttpClient, private alerts: AlertsService) { }

  getBrands() {
    return this.http.get<Brand[]>(this.url)
      .pipe(
        catchError(() => {
          this.alerts.alertPopup("Erro ao carregar as imagens.")
          return empty()
        }),
        map(resp => resp['brands'])
      )
  }
}