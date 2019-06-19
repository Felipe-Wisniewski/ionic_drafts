import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { Subscription } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  title = 'BR Test'
  subscription$: Subscription[] = []

  constructor(private homeService: HomeService, private storage: Storage, private router: Router) { }

  ngOnInit() {
    console.log('HomePage OnInit')
  }

  onClick(opc) {
    switch (opc) {
      case '1': {
        this.getTemplateBlankPostOneProduct().then(() => {
          this.router.navigate(['editor'])
        })
        break
      }
      case '2': {
        this.getTemplateBlankStoryTwoProducts().then(() => {
          this.router.navigate(['editor'])
        })
        break
      }
      case '3': {
        this.getTemplatePostOneProduct().then(() => {
          this.router.navigate(['editor'])
        })
        break
      }
      case '4': {
        this.getTemplatePostTwoProducts().then(() => {
          this.router.navigate(['editor'])
        })
        break
      }
      case '5': {
        this.getTemplateStoryTwoProducts().then(() => {
          this.router.navigate(['editor'])
        })
        break
      }
      case '6': {
        this.getTemplatePostTalMaeTalFilha().then(() => {
          this.router.navigate(['editor'])
        })
        break
      }
      case '7': {
        this.getTemplateStoryTalMaeTalFilha().then(() => {
          this.router.navigate(['editor'])
        })
        break
      }
      case '8': {
        this.getPostPost().then(() => {
          this.router.navigate(['editor'])
        })
        break
      }
      case '9': {
        this.getPostStory().then(() => {
          this.router.navigate(['editor'])
        })
        break
      }
      default: {
        console.log('erro opc', opc)
        break
      }
    }
  }

  getBrand(opc) {
    if (opc == 'brand') {
      this.subscription$.push(this.homeService.getBrand3()
        .subscribe((brand) => {
          this.storage.set('brand', brand)
        }))
    } else {
      this.subscription$.push(this.homeService.getBrandSub8()
        .subscribe((sub) => {
          this.storage.set('brand', sub)
        }))
    }
  }

  async getTemplateBlankPostOneProduct() {
    await this.getBrand('brand')

    await this.subscription$.push(this.homeService.getTemplateWhite()
      .subscribe((tempWhite) => {
        this.storage.set('template', tempWhite)
        this.storage.remove('post')
      }))

    await this.subscription$.push(this.homeService.getProduct()
      .subscribe((prod) => {
        this.storage.set('products', prod)
      }))
  }

  async getTemplateBlankStoryTwoProducts() {
    await this.getBrand('brand')

    await this.subscription$.push(this.homeService.getTemplateWhiteS()
      .subscribe((tempWhiteS) => {
        this.storage.set('template', tempWhiteS)
        this.storage.remove('post')
      }))

    await this.subscription$.push(this.homeService.getProducts()
      .subscribe((prod) => {
        this.storage.set('products', prod)
      }))
  }

  async getTemplatePostOneProduct() {
    await this.getBrand('brand')

    await this.subscription$.push(this.homeService.getTemplate90()
      .subscribe((temp) => {
        this.storage.set('template', temp)
        this.storage.remove('post')
      }))

    await this.subscription$.push(this.homeService.getProduct()
      .subscribe((prod) => {
        this.storage.set('products', prod)
      }))
  }

  async getTemplatePostTwoProducts() {
    await this.getBrand('brand')

    await this.subscription$.push(this.homeService.getTemplate413()
      .subscribe((temp) => {
        this.storage.set('template', temp)
        this.storage.remove('post')
      }))

    await this.subscription$.push(this.homeService.getProducts()
      .subscribe((prod) => {
        this.storage.set('products', prod)
      }))
  }

  async getTemplateStoryTwoProducts() {
    await this.getBrand('brand')

    await this.subscription$.push(this.homeService.getTemplate413s()
      .subscribe((temp) => {
        this.storage.set('template', temp)
        this.storage.remove('post')
      }))

    await this.subscription$.push(this.homeService.getProducts()
      .subscribe((prod) => {
        this.storage.set('products', prod)
      }))
  }

  async getTemplatePostTalMaeTalFilha() {
    await this.getBrand('sub')
    console.log('6')
  }

  async getTemplateStoryTalMaeTalFilha() {
    await this.getBrand('sub')
    console.log('7')
  }

  async getPostPost() {
    await this.getBrand('brand')

    await this.subscription$.push(this.homeService.getPost200()
      .subscribe((post) => {
        this.storage.set('post', post)
        this.storage.remove('template')
      }))
  }

  async getPostStory() {
    await this.getBrand('brand')

    await this.subscription$.push(this.homeService.getPost200s()
      .subscribe((post) => {
        this.storage.set('post', post)
        this.storage.remove('template')
      }))
  }

  ngOnDestroy() {
    console.log('HomePage OnDestroy')
  }
}
