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
      
      if (obj.controls == "background") {
        
      }
      console.log("json obj -> ", obj)
    })

    this.canvas.loadFromJSON(this.json, () => {
      this.getCanvasEvents()
      this.canvas.renderAll.bind(this.canvas)
    })    
  }

  getCanvasEvents() {
    this.canvas.on({
      'mouse:down': (obj) => {
        if (obj.target) {
          switch(obj.target.type) {
            case 'text': {
              console.log('text')
              this.objText = obj.target
              this.textIsSelected = false
              break
            }

            default: {
              console.log('default')
              this.textIsSelected = false
              break
            }
          }
        }
      },
      'touch:gesture': (obj) => {
        console.log(`touch gesture: ${obj}`)
      },
      'mouse:up': (obj) => {
        console.log(`mouse:up: ${obj}`)
      },
      'after:render': (obj) => {
        console.log(`after:render: ${obj}`)
      },
      'before:selection:cleared': (obj) => {
        console.log(`before:selection:cleared: ${obj}`)
      },
      'selection:created': (obj) => {
        console.log(`selection:created: ${obj}`)
      },
      'selection:cleared': (obj) => {
        console.log(`selection:cleared: ${obj}`)
      },
      'object:modified': (obj) => {
        console.log(`object:modified: ${obj}`)
      },
      'object:selected': (obj) => {
        console.log(`object:selected: ${obj}`)
      },
      'object:moving': (obj) => {
        console.log(`object:moving: ${obj}`)
      },
      'object:scaling': (obj) => {
        console.log(`object:scaling: ${obj}`)
      },
      'object:rotating': (obj) => {
        console.log(`object:rotating: ${obj}`)
      },
      'object:added': (obj) => {
        console.log(`object:added: ${obj}`)
      },
      'object:removed': (obj) => {
        console.log(`object:removed: ${obj}`)
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

  setTextSettings(obj: any) {
    console.log(obj)
    /* this.text = ''
    this.textFont = ''
    this.textSize = 0
    this.textColor = ''
    this.textOpacity = 50 */
  }

  async optionsEditText(ev: Event) {
    const popover = await this.popoverController.create({
      component: TextToolsPage,
      event: ev,
      componentProps: {
        objText: this.objText
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