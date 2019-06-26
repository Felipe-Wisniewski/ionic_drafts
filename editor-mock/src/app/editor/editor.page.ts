import { Product } from './../model/product';
import { Post } from './../model/post';
import { Template } from './../model/template';
import { Brand } from './../model/brand';
import { Storage } from '@ionic/storage';
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

  title = ''
  canvas: Canvas

  brand: Brand
  template?: Template = null
  products: Product[]
  prod_one: Product
  prod_two?: Product = null
  post?: Post = null

  layout = ''
  logo = ''
  text_template = ''
  ref = ''

  controls = {
    general: false,
    stamps: false,
    background: false,
    text: false,
    icons: false,
    brandLogos: false,
    gallery: false
  }

  objText: any
  textIsSelected = true

  subscription$: Subscription

  constructor(private edtServ: EditorService, private storage: Storage, private popoverController: PopoverController) { }

  ngOnInit() {
    this.getChoices().then(() => {

      if (this.template != null) {

        if (this.template.json != null) {

          this.setTemplateOnCanvas().then((it) => {
            // console.log(it)
            this.setProductsOnCanvas()
          })

        } else {
          this.setLogoOnCanvas()
          this.setProductsOnCanvas()
          //selecionar logo
          //liberar texto
          //liberar seu logo
          //liberar stamps
          //liberar icons
        }
      }
      if (this.post != null) {
        this.setPostOnCanvas()
        this.setLogoOnCanvas()
      }
    })
  }

  async getChoices() {
    await this.storage.forEach((value, key, n) => {
      switch (key) {

        case 'brand': {
          this.brand = value
          this.title = this.brand.brand
          this.logo = this.brand.logo_url
          break
        }

        case 'template': {
          this.template = value
          if (this.template != null) {
            this.layout = this.template.layout
          }
          break
        }

        case 'products': {
          this.products = value
          this.prod_one = this.products[0]
          this.products[1] != null ? this.prod_two = this.products[1] : this.prod_two = null
          this.ref = this.products[0].ref
          break
        }

        case 'post': {
          this.post = value
          if (this.post != null) {
            this.layout = this.post.layout
            this.ref = this.post.real_ref
          }
          break

        }
        default: {
          break
        }
      }
    }).then(() => {
      this.createCanvas()
    })
  }

  createCanvas() {
    this.canvas = new fabric.Canvas('canvas')
    this.canvas.backgroundColor = '#FFFFFF'
    this.canvas.preserveObjectStacking = true

    let header = document.getElementsByTagName('ion-header').item(0).clientHeight
    let footer = document.getElementsByTagName('ion-footer').item(0).clientHeight
    let widthScreen = parent.innerWidth
    let heightScreen = parent.innerHeight - (header + footer)

    if (this.layout == 'post') {
      if (widthScreen > heightScreen) {
        this.canvas.setDimensions({ width: heightScreen, height: heightScreen })
      } else {
        this.canvas.setDimensions({ width: widthScreen, height: widthScreen })
      }
    }

    if (this.layout == 'story') {
      if (widthScreen > heightScreen) {
        let width = (1080 / 1920) * heightScreen
        this.canvas.setDimensions({ width: width, height: heightScreen })
      } else {
        let height = (1920 / 1080) * widthScreen
        this.canvas.setDimensions({ width: widthScreen, height: height })
      }

    }
    console.log(`canvas - w:${this.canvas.getWidth()} x h:${this.canvas.getHeight()}`)
    this.getCanvasEvents()
  }

  async setTemplateOnCanvas() {
    const fonts = []

    this.template.json.objects.forEach(obj => {

      obj.scaleX = (obj.scaleX / 100) * this.canvas.getWidth()
      obj.scaleY = (obj.scaleY / 100) * this.canvas.getHeight()
      obj.top = (obj.top / 100) * this.canvas.getHeight()
      obj.left = (obj.left / 100) * this.canvas.getWidth()
      obj.lastGoodLeft = obj.left
      obj.lastGoodTop = obj.top

      if (!obj.selectable) obj.evented = false

      if (obj.type === 'text') {
        console.log("json.obj I -> ", obj)
        this.text_template = obj.text
        // let font = new FontFaceObserver(obj.fontFamily)
        let font = obj.fontFamily
        fonts.push(font.load().catch(() => obj.fontFamily = 'Roboto'))
        console.log(fonts)
      }

    })
    return await this.canvas.loadFromJSON(this.template.json, this.canvas.renderAll.bind(this.canvas))
  }

  setProductsOnCanvas() {
    this.products.forEach((prod, idx) => {

      fabric.Image.fromURL(prod.image_url, (image) => {
        let imageWidth, imageTop, imageLeft

        if (this.products.length > 1) {

          if (this.layout === 'post') {
            imageWidth = this.canvas.getWidth() - (this.canvas.getWidth() / 3)
            idx == 0 ? imageTop = 15 : imageTop = this.canvas.getHeight() / 2
            idx == 0 ? imageLeft = 15 : imageLeft = (this.canvas.getWidth() / 3) - 15

          } else {
            imageWidth = this.canvas.getWidth()
            idx == 0 ? imageTop = 0 : imageTop = this.canvas.getHeight() / 2
            idx == 0 ? imageLeft = 0 : imageLeft = 0
          }
          image.top = imageTop
          image.left = imageLeft
          image.scaleToWidth(imageWidth)

        } else {
          image.originY = 'center'
          image.top = this.canvas.getHeight() / 2
          image.scaleToWidth(this.canvas.getWidth())
        }

        image.lockUniScaling = true
        image.cornerStyle = 'circle'
        image.cornerSize = 20
        image.name = `product${idx}`
        
        // adicionar 'controls = general'
        /* image.on('selected', (it) => {
          // console.log(it)
        }) */
        this.canvas.add(image).sendToBack(image)
      })
    })
  }

  setPostOnCanvas() {
    fabric.Image.fromURL(this.post.post_url, (post) => {
      post.scaleToHeight(this.canvas.getHeight())
      this.canvas.setOverlayImage(post, this.canvas.renderAll.bind(this.canvas))
    })
  }

  setLogoOnCanvas() {
    fabric.Image.fromURL(this.logo, (logo) => {
      logo.scaleToWidth(this.canvas.getWidth() / 2.5)
      logo.cornerStyle = 'circle'
      logo.cornerSize = 20
      logo.top = this.canvas.getHeight() - ((logo.scaleY * logo.height) + 20)
      logo.left = 20
      logo.lockUniScaling = true
      this.canvas.add(logo)
      this.canvas.setOverlayImage(logo, this.canvas.renderAll.bind(this.canvas))
    })
  }

  getCanvasEvents() {
    this.canvas.on({
      'mouse:down': (obj) => {
        console.log(`mouse:down:`)
        console.log(obj)

        if (obj.target) {
          switch (obj.target.type) {
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
