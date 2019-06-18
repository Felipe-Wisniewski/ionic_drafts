import { Component } from '@angular/core';
import { ModalController, ActionSheetController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { fabric } from 'fabric';
import * as FontFaceObserver from 'fontfaceobserver';

import { TextToolsPage } from './text-tools/text-tools.page';
import { Canvas } from 'fabric/fabric-impl';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  canvas: Canvas
  json: any
  title = 'Test'
  
  textIsSelected = true
  objText: any

  subscription$: Subscription

  constructor(private homeService: HomeService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.getTemplate()
    console.log('ngOnInit');
  }

  getTemplate() {
    this.subscription$ = this.homeService.getTemplate()
    .subscribe(_template => {
      this.json = _template.json
      this.setCanvasDimensions()
    })
  }

  setCanvasDimensions() {
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
    console.log(`canvas - w:${this.canvas.getWidth()} x h:${this.canvas.getHeight()}`)
    this.getCanvasEvents()
    this.setTemplateOnCanvas()
  }

  setTemplateOnCanvas() {
    const fonts = []

    this.json.objects.forEach(obj => {
      obj.scaleX = obj.scaleX / 100 * this.canvas.getWidth()
      obj.scaleY = obj.scaleY / 100 * this.canvas.getHeight()
      obj.top = obj.top / 100 * this.canvas.getHeight()
      obj.left = obj.left / 100 * this.canvas.getWidth()
      obj.lastGoodLeft = obj.left
      obj.lastGoodTop = obj.top
      
      if (!obj.selectable) {
        obj.evented = false
      }

      if (obj.type == 'text') {
        let font = new FontFaceObserver(obj.fontFamily)
        fonts.push(font.load().catch(() => obj.fontFamily = 'Roboto'))
      }
      console.log(fonts)

      if (obj.controls == "background") {
        
      }
      console.log("json obj -> ", obj)
    })

    this.canvas.loadFromJSON(this.json, () => {
      this.canvas.renderAll.bind(this.canvas)
    })    
  }

  getCanvasEvents() {
    this.canvas.on({
      'mouse:down': (obj) => {
        console.log(`mouse:down:`)
        console.log(obj)

        if (obj.target) {
          switch(obj.target.type) {
            case 'text': {
              this.objText = obj.target
              this.textIsSelected = false
              break
            }

            default: {
              this.textIsSelected = false
              break
            }
          }
        }
      },
      'touch:gesture': (obj) => {
        console.log(`touch gesture:`)
        console.log(obj)
      },
      'mouse:up': (obj) => {
        console.log(`mouse:up:`)
        console.log(obj)
      },
      'after:render': (obj) => {
        console.log(`after:render:`)
        console.log(obj)
      },
      'before:selection:cleared': (obj) => {
        console.log(`before:selection:cleared:`)
        console.log(obj)
      },
      'selection:created': (obj) => {
        console.log(`selection:created:`)
        console.log(obj)
      },
      'selection:cleared': (obj) => {
        console.log(`selection:cleared:`)
        console.log(obj)
      },
      'object:modified': (obj) => {
        console.log(`object:modified:`)
        console.log(obj)
      },
      'object:selected': (obj) => {
        console.log(`object:selected:`)
        console.log(obj)
      },
      'object:moving': (obj) => {
        console.log(`object:moving:`)
        console.log(obj)
      },
      'object:scaling': (obj) => {
        console.log(`object:scaling:`)
        console.log(obj)
      },
      'object:rotating': (obj) => {
        console.log(`object:rotating:`)
        console.log(obj)
      },
      'object:added': (obj) => {
        console.log(`object:added:`)
        console.log(obj)
      },
      'object:removed': (obj) => {
        console.log(`object:removed:`)
        console.log(obj)
      }
    })
  }

  share() {
    console.log('share')
  }

  openChangeProduct() {
    console.log('openChangeProduct')
  }

  async addItems() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Insert items',
      buttons: [{
        text: 'Brand logos',
        icon: 'photos',
        handler: () => { this.addItemsModal() }
      }, {
        text: 'Your logo',
        icon: 'image',
        handler: () => { this.addItemsModal() }
      }, {
        text: 'Stamps',
        icon: 'pricetags',
        handler: () => { this.addItemsModal() }
      }, {
        text: 'Icons',
        icon: 'information',
        handler: () => { this.addItemsModal() }
      }]
    })
    await actionSheet.present()
  }

  async addItemsModal() {
    const modal = await this.modalController.create({
      component: '',
      componentProps: {
        choose: 'choose'
      }
    })

    modal.onDidDismiss().then((it) => {
      if (it.data != null || it.data != undefined) {
        console.log(it.data['choose'])
        let image = it.data['choose'].image_url
      }
    })
    return await modal.present()
  }

  async optionsEditText(ev: Event) {
    const popover = await this.popoverController.create({
      component: TextToolsPage,
      event: ev,
      animated: true,
      translucent: true,
      componentProps: {
        objText: this.objText,
        canvas: this.canvas
      }
    })

    popover.onDidDismiss().then(it => {
      console.log(it)
    })
    return await popover.present()
  }

  deleteObject() {
    console.log('deleteObjectOnCanvas')
  }

  ngOnDestroy() {
    console.log('On Destroy')
  }
}