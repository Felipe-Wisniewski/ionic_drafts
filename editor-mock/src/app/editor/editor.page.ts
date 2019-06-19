import { Component, OnInit } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { Subscription } from 'rxjs';
import { EditorService } from './editor.service';
import { PopoverController } from '@ionic/angular';
import { fabric } from 'fabric';
import { AddTextPage } from './add-text/add-text.page';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  
  title = 'Test'
  canvas: Canvas
  json: any
  prod_one: any
  prod_two: any
  
  objText: any
  textIsSelected = true

  subscription$: Subscription

  constructor(private editorService: EditorService, private popoverController: PopoverController) { }

  ngOnInit() {
    this.getChoices()
  }

  getChoices() {
    this.subscription$ = this.editorService.getTemplate()
      .subscribe(_template => {
        this.json = _template['json']
        this.setCanvasDimensions()
      })

    this.subscription$ = this.editorService.getProducts()
      .subscribe(prods => {
        if (prods > 1) {
          console.log('>', prods)
        } else {
          console.log('<', prods)
        }
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
    // console.log(`canvas - w:${this.canvas.getWidth()} x h:${this.canvas.getHeight()}`)
    // this.getCanvasEvents()
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
        // let font = new FontFaceObserver(obj.fontFamily)
        // fonts.push(font.load().catch(() => obj.fontFamily = 'Roboto'))
      }
      console.log(fonts)

      if (obj.controls == "background") {
        
      }
      console.log("json obj -> ", obj)
    })

    this.canvas.loadFromJSON(this.json, this.canvas.renderAll.bind(this.canvas), (o, ob) => {
      console.log('loadFromJSON')
      console.log(o)
      console.log(ob)
      console.log('------------')
      this.canvas.sendToBack(ob).renderAll()
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

  addItems() {
    
  }
  /* async addItems() {
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
  } */

  async optionsEditText(ev: Event) {
    const popover = await this.popoverController.create({
      component: AddTextPage,
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
