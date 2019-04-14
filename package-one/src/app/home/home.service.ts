import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlBrands: string = environment.URL_API  + 'brands';
  private brandsMock: string = 'assets/mocks/brands.json';

  private url: string =  this.brandsMock;

  constructor(private http: HttpClient) { }

  getBrands() {
    return this.http.get(this.url);
  }
}