import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  brand: any
  template: any
  products: any[]
  post: any
  ok = 0

  constructor(private storage: Storage, private router: Router) {}

  onClick1() {
    console.log(this.openEditor().then(() => {
      this.router.navigate(['editor']) 
    }))
  }

  onClick2(){

  }

  onClick3() {

  }

  onClick4() {

  }

  onClick5() {

  }

  onClick6() {

  }

  onClick7() {
    
  }

  async openEditor() {
    const s = this.storage

    s.set('brand', this.brand)
    s.set('template', this.template)
    s.set('products', this.products)
    s.set('post', this.post)

    return await s.ready()
  }
  
  // this.router.navigate(['templates-posts'])
  // this.router.navigate(['sub-brand'])
}
