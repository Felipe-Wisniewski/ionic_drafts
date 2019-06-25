import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription, concat } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  title = 'BR Test'
  sub$: Subscription

  constructor(private homeService: HomeService, private storage: Storage, private router: Router) {
    this.storage.clear()
  }

  onClick(opc) {
    switch (opc) {
      case '1': {
        this.getTemplateBlankPostOneProduct()
        break
      }
      case '2': {
        this.getTemplateBlankStoryTwoProducts()
        break
      }
      case '3': {
        this.getTemplatePostOneProduct()
        break
      }
      case '4': {
        this.getTemplatePostTwoProducts()
        break
      }
      case '5': {
        this.getTemplateStoryTwoProducts()
        break
      }
      case '6': {
        this.getTemplatePostTalMaeTalFilha()
        break
      }
      case '7': {
        this.getTemplateStoryTalMaeTalFilha()
        break
      }
      case '8': {
        this.getPostPost()
        break
      }
      case '9': {
        this.getPostStory()
        break
      }
      default: {
        console.log('erro opc', opc)
        break
      }
    }
  }

  getTemplateBlankPostOneProduct() {
    const brand = this.homeService.getBrand3()
      .pipe(tap(b => this.storage.set('brand', b)))
    const template = this.homeService.getTemplateWhite()
      .pipe(tap(t => this.storage.set('template', t)))
    const prod = this.homeService.getProduct()
      .pipe(tap(p => this.storage.set('products', [p])))

    const result = concat(brand, template, prod)

    this.sub$ = result.subscribe(
      () => { },
      (err) => { console.log(err) },
      () => {
        this.storage.remove('post')
        this.router.navigate(['editor'])
      })
  }

  getTemplateBlankStoryTwoProducts() {
    const brand = this.homeService.getBrand3()
      .pipe(tap(b => this.storage.set('brand', b)))
    const template = this.homeService.getTemplateWhiteS()
      .pipe(tap(t => this.storage.set('template', t)))
    const prod = this.homeService.getProducts()
      .pipe(tap(p => this.storage.set('products', p)))

    const result = concat(brand, template, prod)
    this.sub$ = result.subscribe(
      () => { },
      (err) => { console.log(err) },
      () => {
        this.storage.remove('post')
        this.router.navigate(['editor'])
      })
  }

  getTemplatePostOneProduct() {
    const brand = this.homeService.getBrand3()
      .pipe(tap(b => this.storage.set('brand', b)))
    const template = this.homeService.getTemplate90()
      .pipe(tap(t => this.storage.set('template', t)))
    const prod = this.homeService.getProduct()
      .pipe(tap(p => this.storage.set('products', [p])))

    const result = concat(brand, template, prod)
    this.sub$ = result.subscribe(
      () => { },
      (err) => { console.log(err) },
      () => {
        this.storage.remove('post')
        this.router.navigate(['editor'])
      })
  }

  getTemplatePostTwoProducts() {
    const brand = this.homeService.getBrand3()
      .pipe(tap(b => this.storage.set('brand', b)))
    const template = this.homeService.getTemplate413()
      .pipe(tap(t => this.storage.set('template', t)))
    const prod = this.homeService.getProducts()
      .pipe(tap(p => this.storage.set('products', p)))

    const result = concat(brand, template, prod)
    this.sub$ = result.subscribe(
      () => { },
      (err) => { console.log(err) },
      () => {
        this.storage.remove('post')
        this.router.navigate(['editor'])
      })
  }

  getTemplateStoryTwoProducts() {
    const brand = this.homeService.getBrand3()
      .pipe(tap(b => this.storage.set('brand', b)))
    const template = this.homeService.getTemplate413s()
      .pipe(tap(t => this.storage.set('template', t)))
    const prod = this.homeService.getProducts()
      .pipe(tap(p => this.storage.set('products', p)))

    const result = concat(brand, template, prod)
    this.sub$ = result.subscribe(
      () => { },
      (err) => { console.log(err) },
      () => {
        this.storage.remove('post')
        this.router.navigate(['editor'])
      })
  }

  getTemplatePostTalMaeTalFilha() {
    console.log('6')
  }

  getTemplateStoryTalMaeTalFilha() {
    console.log('7')
  }

  getPostPost() {
    const brand = this.homeService.getBrand3()
      .pipe(tap(b => this.storage.set('brand', b)))
    const post = this.homeService.getPost200()
      .pipe(tap(p => this.storage.set('post', p)))

    const result = concat(brand, post)
    this.sub$ = result.subscribe(
      () => { },
      (err) => { console.log(err) },
      () => {
        this.storage.remove('template')
        this.storage.remove('products')
        this.router.navigate(['editor'])
      })
  }

  getPostStory() {
    const brand = this.homeService.getBrand3()
      .pipe(tap(b => this.storage.set('brand', b)))
    const post = this.homeService.getPost200s()
      .pipe(tap(p => this.storage.set('post', p)))

    const result = concat(brand, post)
    this.sub$ = result.subscribe(
      () => { },
      (err) => { console.log(err) },
      () => {
        this.storage.remove('template')
        this.storage.remove('products')
        this.router.navigate(['editor'])
      })
  }

  ngOnDestroy() {
    console.log('HomePage OnDestroy')
    this.sub$.unsubscribe()
  }
}
