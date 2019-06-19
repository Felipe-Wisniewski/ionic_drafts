import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private http: HttpClient) { }

  getTemplate() {
    return this.http.get('http://localhost:3000/template')
  }

  getProducts() {
    return this.http.get('http://localhost:3000/products')
  }
