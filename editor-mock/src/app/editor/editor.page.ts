import { Product } from './../model/product';
import { Post } from './../model/post';
import { Template } from './../model/template';
import { Brand } from './../model/brand';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { EditorService } from './editor.service';
import { PopoverController } from '@ionic/angular';
import { fabric } from 'fabric';
import { AddTextPage } from './add-text/add-text.page';
import { AddItemsPage } from './add-items/add-items.page';
import { ProductPopoverPage } from './product-popover/product-popover.page';

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

  objectSelected: any
  deletableObject = false

  controls = {
    general: false,
    text: false,
    icons: false,
    stamps: false,
    brandLogos: false,
    background: false,
    gallery: true
  }

  constructor(private edtServ: EditorService, private storage: Storage, private popoverController: PopoverController) { }

  ngOnInit() {
    this.getChoices().then(() => {

      if (this.template != null) {

        if (this.template.json != null) {
          this.setTemplateOnCanvas().then(() => {
            this.setProductsOnCanvas()
          })

        } else {
          this.setControls()
          this.setProductsOnCanvas()
          this.setLogoOnCanvas()
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
          // this.ref = this.products[0].ref
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
      console.log("json.obj I -> ", obj)
      obj.scaleX = (obj.scaleX / 100) * this.canvas.getWidth()
      obj.scaleY = (obj.scaleY / 100) * this.canvas.getHeight()
      obj.top = (obj.top / 100) * this.canvas.getHeight()
      obj.left = (obj.left / 100) * this.canvas.getWidth()
      obj.lastGoodLeft = obj.left
      obj.lastGoodTop = obj.top

      if (!obj.selectable) obj.evented = false

      if (obj.type) {
        this.controls.text = true
        this.text_template = obj.text
        // let font = new FontFaceObserver(obj.fontFamily)
        // fonts.push(font.load().catch(() => obj.fontFamily = 'Roboto'))
      }
    })
    return await this.canvas.loadFromJSON(this.template.json, this.canvas.renderAll.bind(this.canvas))
  }

  setControls() {
    this.controls.brandLogos = true
    this.controls.icons = true
    this.controls.stamps = true
    this.controls.text = true
  }

  setProductsOnCanvas() {
    this.products.forEach((product, idx) => {

      fabric.Image.fromURL(product.image_url, (prod) => {
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
          prod.top = imageTop
          prod.left = imageLeft
          prod.scaleToWidth(imageWidth)

        } else {
          prod.originY = 'center'
          prod.top = this.canvas.getHeight() / 2
          prod.scaleToWidth(this.canvas.getWidth())
        }

        prod.cornerStyle = 'circle'
        prod.cornerSize = 20
        prod.name = `product${idx}`
        prod.lockUniScaling = true
        prod.setOptions({ controls: 'general' })
        prod.setOptions({ ref: product.ref })
        this.canvas.add(prod).sendToBack(prod)
      })
    })
  }

  setPostOnCanvas() {
    fabric.Image.fromURL(this.post.post_url, (post) => {
      post.scaleToHeight(this.canvas.getHeight())
      // post.scaleToWidth(this.canvas.getWidth())
      this.canvas.setOverlayImage(post, this.canvas.renderAll.bind(this.canvas))
    })
  }

  setLogoOnCanvas() {
    fabric.Image.fromURL(this.logo, (logo) => {
      logo.scaleToWidth(this.canvas.getWidth() / 2.5)
      logo.top = this.canvas.getHeight() - ((logo.scaleY * logo.height) + 20)
      logo.left = 20
      logo.cornerStyle = 'circle'
      logo.cornerSize = 20
      logo.lockUniScaling = true
      logo.setOptions({ controls: 'brand-logos' })
      this.canvas.add(logo)
      this.canvas.setOverlayImage(logo, this.canvas.renderAll.bind(this.canvas)).setActiveObject(logo)
    })
  }

  getCanvasEvents() {
    this.canvas.on({
      'selection:created': (obj) => {
        this.eventSelectionCreated(obj.target)
      },
      'selection:updated': (obj) => {
        this.eventSelectionCreated(obj.target)
      },
      'selection:cleared': (obj) => {
        console.log(`- selection:cleared:`)
        this.eventSelectionCleared()
      },
      'object:added': (obj) => {
        console.log(`object:added:`, obj)
      },
      'object:removed': (obj) => {
        console.log(`object:removed:`, obj)
      }
    })
  }

  eventSelectionCreated(object) {
    switch (object.controls) {
      case 'general': {
        this.deletableObject = false
        this.controls.general = true
        break
      }
      case 'text': {
        object.removable ? this.deletableObject = true : this.deletableObject = false
        console.log(object)
        break
      }
      case 'gallery': {
        break
      }
      case 'brand-logos': {
        this.deletableObject = false

        break
      }
      case 'stamps': {

        break
      }
      case 'icons': {

        break
      }
      case 'background': {
        break
      }
      default: {
        break
      }
    }
    this.objectSelected = object
  }

  eventSelectionCleared() {
    this.objectSelected = null
    this.canvas.forEachObject((obj) => {
      console.log(obj)
    })
  }

  share() {
    console.log(JSON.stringify(this.canvas))
  }

  async productPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: ProductPopoverPage,
      event: event,
      animated: true,
      translucent: true,
      componentProps: {
        canvas: this.canvas,
        objItems: this.objectSelected,
        controls: this.controls,
        ref: this.ref
      }
    })

    popover.onDidDismiss().then((item) => {
      console.log(item)
    })
    return await popover.present()
  }

  async addItemsPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: AddItemsPage,
      event: event,
      animated: true,
      translucent: true,
      componentProps: {
        canvas: this.canvas,
        objItems: this.objectSelected,
        controls: this.controls
      }
    })

    popover.onDidDismiss().then((item) => {
      console.log(item)
    })
    return await popover.present()
  }

  async addTextPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: AddTextPage,
      event: event,
      animated: true,
      translucent: true,
      componentProps: {
        canvas: this.canvas,
        objText: this.objectSelected,
        controls: this.controls
      }
    })

    popover.onDidDismiss().then((it) => {
      console.log(it)
      // if (this.objItem.text == '') this.canvas.remove(this.objItem)
    })
    return await popover.present()
  }

  deleteObjectOnCanvas() {
    console.log('deleteObjectOnCanvas')
    this.canvas.remove(this.objectSelected)
  }

  ngOnDestroy() {
    console.log('On Destroy')
  }

}
