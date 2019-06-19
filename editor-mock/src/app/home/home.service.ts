import { Brand, Subdivision } from './../model/brand';
import { Template } from './../model/template';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getBrand3() {
    return this.http.get<Brand>('http://localhost:3000/brand3')
  }

  getBrandSub8() {
    return this.http.get<Subdivision>('http://localhost:3000/brandSub8')
  }

  getTemplateWhite() {
    return this.http.get<Template>('http://localhost:3000/templateWhite')
  }

  getTemplateWhiteS() {
    return this.http.get<Template>('http://localhost:3000/templateWhiteS')
  }

  getTemplate413() {
    return this.http.get<Template>('http://localhost:3000/template413')
  }

  getTemplate90() {
    return this.http.get<Template>('http://localhost:3000/template90')
  }

  getTemplate413s() {
    return this.http.get<Template>('http://localhost:3000/template413s')
  }

  getProduct() {
    return this.http.get<Product>('http://localhost:3000/product')
  }

  getProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products')
  }

  getPost200() {
    return this.http.get<Product[]>('http://localhost:3000/post200')
  }
  
  getPost200s() {
    return this.http.get<Product[]>('http://localhost:3000/post200s')
  }
}
