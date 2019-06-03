import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AlertsService } from '../shared/alerts.service';
import { Feed } from '../model/feed';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private url = `${environment.URL_API}feed`

  constructor(private http: HttpClient, private alerts: AlertsService) { }

  getFeed() {
    return this.http.get<Feed[]>(this.url)
      .pipe(
        catchError(() => {
          this.alerts.alertPopup('Erro ao carregar o feed, tente novamente mais tarde.')
          return empty()
        })
      )
  }
}
