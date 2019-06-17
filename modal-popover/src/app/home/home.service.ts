import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = 'http://10.1.1.153:9090/api/templates/90'

  constructor(private http: HttpClient) { }

  getTemplate() {
    return this.http.get(this.url)
      .pipe(
        catchError(() => {
          return empty()
        }),
        map(resp => resp['template'])
      )
  }
}
