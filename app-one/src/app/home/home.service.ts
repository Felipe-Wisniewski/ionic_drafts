import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlBrands: string = environment.URL_API  + 'brands';
  private brandsMock: string = 'assets/mocks/brands.json';

  private url: string =  this.brandsMock;

  constructor(private http: HttpClient, private storage: Storage) { }

  getBrands() {
    return this.http.get(this.url)
      .pipe(
        tap(resp => this.storage.set('brands', resp['brands'])),
        map(resp => resp['brands'].filter(b => b.home))
      );
  }
}
