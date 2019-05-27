import { HomeService } from './home.service';
import { HomeModalPage } from '../home-modal/home-modal.page';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  canvas: Canvas

  logosBrand = []
  logosUser = []
  stamps = []
  icons = []

  subscription$: Subscription[] = []

  id_brand = 3
  template = 'https://s3-sa-east-1.amazonaws.com/bancoimagens.com.br/backgrounds_en/3-template_brc2.png?i=10'
  product1 = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/8369-205-13488-15745.jpg'
  product2 = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/2123-200-17763-65457.jpg'

  constructor(private modalController: ModalController, 
    private actionSheetController: ActionSheetController,
    private homeService: HomeService) {}

  ngOnInit() {
    this.loadCanvas()
    this.loadItems()
  }

  loadCanvas() {
    this.canvas = new fabric.Canvas('canvas')
    
    let header = document.getElementsByTagName('ion-header').item(0).clientHeight
    let footer = document.getElementsByTagName('ion-footer').item(0).clientHeight
    let widthScreen = parent.innerWidth
    let heightScreen = parent.innerHeight - (header + footer)
    
    if (widthScreen > heightScreen) {
      this.canvas.setDimensions({ width: heightScreen, height: heightScreen })  
    } else {
      this.canvas.setDimensions({ width: widthScreen, height: widthScreen })  
    }
    
    //add template
    fabric.Image.fromURL(this.template, (template) => {
      template.scaleToHeight(this.canvas.getHeight())
      this.canvas.setOverlayImage(template, this.canvas.renderAll.bind(this.canvas))
    })

    //produto 1
    fabric.Image.fromURL(this.product1, (product1) => {
      product1.scale(0.4)
      product1.cornerStyle = 'circle'
      product1.lockUniScaling = true

      this.canvas.add(product1)
      product1.center()
    })

    //produto 2
    fabric.Image.fromURL(this.product2, (product2) => {
      product2.scale(0.4)
      product2.lockUniScaling = true

      this.canvas.add(product2)
    })
  }

  loadItems() {
    this.subscription$.push(this.homeService.getBrandsLogos(this.id_brand)
      .subscribe(_bLogos => {
        _bLogos.forEach(l => this.logosBrand.push(l))
      }))
    
    // this.homeService.getUserLogos()
        
    this.subscription$.push(this.homeService.getStamps(this.id_brand)
      .subscribe(_stamps => {
        _stamps.forEach(s => this.stamps.push(s))
      }))
    
    this.subscription$.push(this.homeService.getIcons(this.id_brand)
      .subscribe(_icons => {
        _icons.forEach(i => this.icons.push(i))
      }))
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Insert',
      translucent: true,
      buttons: [{
        text: 'Logos brand',
        icon: 'share',
        handler: () => {
          this.addModal(this.logosBrand)
        }
      }, {
        text: 'Your logos',
        icon: 'arrow-dropright-circle',
        handler: () => {
          this.addModal(this.logosUser)
        }
      }, {
        text: 'Stamps',
        icon: 'heart',
        handler: () => {
          this.addModal(this.stamps)
        }
      }, {
        text: 'Icons',
        icon: 'close',
        handler: () => {
          this.addModal(this.icons)
        }
      }]
    });
    await actionSheet.present()
  }

  async addModal(choose: any) {
    const modal = await this.modalController.create({
      component: HomeModalPage,
      componentProps: { 
        choose: choose,
      }
    })
    return await modal.present()
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe())
  }
}
