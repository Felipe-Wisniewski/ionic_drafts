import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getTemplate() {
    return this.http.get('http://localhost:3000/template')
  }

  getProducts() {
    return this.http.get('http://localhost:3000/products')
  }
}
