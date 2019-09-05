import { Component, OnInit, enableProdMode } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  products: any
  isPress = false
  productsPress = []
  
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getProducts().subscribe((resp) => {
      console.log(resp)
      this.products = resp
    })
  }

  press(prod, idx) {
    this.isPress = true
    this.productsPress.push(prod)
  }

  tap(prod, idx) {
    if (!this.isPress) {
      console.log(prod)
    }
  }

  clearSelected() {
    this.isPress = false
    this.productsPress = []
  }

  delete() {

  }
}
