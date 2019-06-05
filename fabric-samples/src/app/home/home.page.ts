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
  subscription$: Subscription[] = []

  logosBrand = []
  logosUser = []
  stamps = []
  icons = []

  id_brand = 0
  layout = ''
  template = ''
  product1 = ''
  product2 = ''
  json = ''

  objectIsSelected = false
  objectSelected: any

  constructor(private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private homeService: HomeService) { }

  ngOnInit() {
    this.getChoose()
    this.loadItemsEditor()
  }

  getChoose() {
    this.layout = 'post' // change layout

    if (this.layout == 'post') this.template = 'https://s3-sa-east-1.amazonaws.com/bancoimagens.com.br/backgrounds_en/3-template_brc2.png?i=10'
    if (this.layout == 'story') this.template = 'assets/img/story.png'

    this.id_brand = 3
    this.product1 = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/8369-205-13488-15745.jpg'
    this.product2 = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/2123-200-17763-65457.jpg'
    this.json = '{"version":"2.2.3","objects":[{"type":"image","version":"2.2.3","originX":"left","originY":"top","left":0,"top":0,"width":800,"height":800,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.12531017369727,"scaleY":0.12531017369727,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"crossOrigin":"Anonymous","cropX":0,"cropY":0,"removable":true,"maxWidth":800,"maxHeight":800,"controls":"background","cornerStyle":"circle","cornerSize":20,"rotatingPointOffset":30,"changeColor":true,"changeFont":true,"lockMovementX":true,"lockMovementY":true,"selectable":false,"lockUniScaling":true,"evented":false,"src":"https:\/\/s3-sa-east-1.amazonaws.com\/bancoimagens.com.br\/backgrounds_en\/3-template_brc2.png?i=10","filters":[]}],"background":"#FFFFFF","lockNewObjects":true,"name":"atemporal2 en","thumbnailUrl":"https:\/\/s3-sa-east-1.amazonaws.com\/bancoimagens.com.br\/templates\/9bcc2a0cc1da524aac2e5d34f073c49d.","thumbnail":"9bcc2a0cc1da524aac2e5d34f073c49d."}'
    // this.json = '{"background":"#FFF","hoverCursor":"move","objects":[{"angle":0,"backgroundColor":"","charSpacing":0,"clipTo":null,"editable":true,"evented":true,"fill":"rgb(0,0,0)","fillRule":"nonzero","flipX":false,"flipY":false,"fontFamily":"Roboto","fontSize":50,"fontStyle":"normal","fontWeight":"400","globalCompositeOperation":"source-over","height":56.5,"hoverCursor":null,"left":987.5,"lineHeight":1.4,"lockScalingFlip":true,"lockUniScaling":true,"ludus":{"placeholder":false,"type":"title"},"objectCaching":true,"opacity":1,"originX":"center","originY":"center","scaleX":1,"scaleY":1,"selectable":true,"shadow":null,"skewX":0,"skewY":0,"stroke":null,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"strokeWidth":1,"styles":{},"text":"","textAlign":"center","textBackgroundColor":"","textDecoration":"","top":515,"transformMatrix":null,"type":"i-text","visible":true,"width":2},{"alignX":"none","alignY":"none","angle":0,"backgroundColor":"","clipTo":null,"crossOrigin":"Anonymous","evented":true,"fill":"rgb(0,0,0)","fillRule":"nonzero","filters":[],"flipX":false,"flipY":false,"globalCompositeOperation":"source-over","height":980,"hoverCursor":null,"left":966.87,"lockScalingFlip":true,"lockUniScaling":true,"ludus":{"type":"image"},"meetOrSlice":"meet","objectCaching":false,"opacity":1,"originX":"center","originY":"center","resizeFilters":[],"scaleX":1.51,"scaleY":1.51,"selectable":true,"shadow":null,"skewX":0,"skewY":0,"src":"https://res.cloudinary.com/hcdkt0ybc/image/upload/v1499943206/l8hy2ktnaezxwhngi9y9.jpg","stroke":null,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"strokeWidth":0,"top":558.41,"transformMatrix":null,"type":"image","visible":true,"width":1306},{"angle":2.71,"backgroundColor":"","charSpacing":0,"clipTo":null,"editable":true,"evented":true,"fill":"rgba(255,252,252,1)","fillRule":"nonzero","flipX":false,"flipY":false,"fontFamily":"Roboto","fontSize":50,"fontStyle":"normal","fontWeight":"400","globalCompositeOperation":"source-over","height":56.5,"left":773.55,"lineHeight":1.4,"lockScalingFlip":true,"lockUniScaling":true,"ludus":{"placeholder":false,"type":"title"},"objectCaching":true,"opacity":1,"originX":"center","originY":"center","scaleX":2.09,"scaleY":2.09,"selectable":true,"shadow":null,"skewX":0,"skewY":0,"stroke":null,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"strokeWidth":1,"styles":{"0":{"1":{},"2":{},"3":{},"4":{},"5":{},"6":{},"7":{},"8":{},"9":{},"10":{},"11":{},"12":{},"13":{}}},"text":"Alternativen!","textAlign":"center","textBackgroundColor":"","textDecoration":"","top":203.84,"transformMatrix":null,"type":"i-text","visible":true,"width":278.91}]}'

    this.setCanvasDimensions()
  }

  setCanvasDimensions() {
    this.canvas = new fabric.Canvas('canvas')

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
      let width = (1080 / 1920) * heightScreen
      this.canvas.setDimensions({ width: width, height: heightScreen })
    }

    console.log(`canvas - w:${this.canvas.getWidth()} x h:${this.canvas.getHeight()}`)
    this.setTemplateOnCanvas()
  }

  setTemplateOnCanvas() {
    
    this.canvas.loadFromJSON(this.json, () => {
      this.canvas.renderAll.bind(this.canvas)
      // this.setImageOnCanvas(this.product1)
      // this.setImageOnCanvas(this.product2)
      // this.setTextOnCanvas('hello world')
    })
    
    /* fabric.Image.fromURL(this.template, (template) => {
      template.scaleToHeight(this.canvas.getHeight())
      // template.width = this.canvas.getWidth()
      // template.height = this.canvas.getHeight()
      this.canvas.setOverlayImage(template, this.canvas.renderAll.bind(this.canvas))
    }) */

    

    this.getCanvasEvents()
  }

  setImageOnCanvas(imageUrl: string) {
    fabric.Image.fromURL(imageUrl, (image) => {
      image.scaleToWidth(this.canvas.getWidth() / 2)
      image.cornerStyle = 'circle'
      image.lockUniScaling = true

      image.on('selected', (it) => {
        console.log(`selected => ${it}`)
      })

      this.canvas.add(image).centerObject(image)
      this.canvas.renderAll()
    })
  }

  setTextOnCanvas(text: string) {
    let _text = new fabric.Text(text, {
      left: this.canvas.getWidth() / 2,
      top: this.canvas.getHeight() / 2,
      fontFamily: 'Comic Sans',
      fontSize: 40,
      lockUniScaling: true
    })
    this.canvas.add(_text).centerObject(_text)
  }

  getCanvasEvents() {
    this.canvas.on({
      'mouse:down': (obj) => {
        if (obj.target) {
          console.log(`mouse:down => `)
          console.log(obj)
          this.objectSelected = obj.target
          this.objectIsSelected = true
        } else {
          this.objectSelected = null
          this.objectIsSelected = false
        }
      },
      'touch:gesture': (obj) => {
        console.log(`touch gesture: ${obj}`)
      }
    })
  }

  share() {
    console.log('share')
    // console.log(this.canvas.getObjects())
    this.canvas.forEachObject((it, i) => {
      console.log(i)
      console.log(it)
      console.log(it.type)
    })
  }

  openChangeProduct() {
    console.log('change product')
  }

  async openOptionsAddItems() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Insert items',
      buttons: [
        {
          text: 'Brand logos',
          icon: 'photos',
          handler: () => {
            this.addItemsModal(this.logosBrand)
          }
        },
        {
          text: 'Your logo',
          icon: 'image',
          handler: () => {
            this.addItemsModal(this.logosUser)
          }
        },
        {
          text: 'Stamps',
          icon: 'pricetags',
          handler: () => {
            this.addItemsModal(this.stamps)
          }
        },
        {
          text: 'Icons',
          icon: 'information',
          handler: () => {
            this.addItemsModal(this.icons)
          }
        }
      ]
    });
    await actionSheet.present()
  }

  async addItemsModal(choose: any) {
    const modal = await this.modalController.create({
      component: HomeModalPage,
      componentProps: {
        choose: choose
      }
    })

    modal.onDidDismiss().then((it) => {
      if (it.data != null || it.data != undefined) {
        console.log(it.data['choose'])
        let image = it.data['choose'].image_url
        this.setImageOnCanvas(image)
      }
    })
    return await modal.present()
  }

  async openOptionsEditText() {
    const editTextActionSheet = await this.actionSheetController.create({
      header: 'Text Input',
      buttons: [
        {
          text: 'Font',
          icon: 'photos',
          handler: () => {
            console.log(this)
          }
        },
        {
          text: 'Font size',
          icon: 'image',
          handler: () => {
            console.log(this)
          }
        },
        {
          text: 'Color',
          icon: 'color-palette',
          handler: () => {
            console.log(this)
          }
        },
        {
          text: 'Opacity',
          icon: 'information',
          handler: () => {
            console.log(this)
          }
        }
      ]
    });
    await editTextActionSheet.present()
  }

  deleteObjectOnCanvas() {
    this.canvas.remove(this.objectSelected)
    this.objectSelected = null
    this.objectIsSelected = false
  }

  loadItemsEditor() {
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

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe())
  }
}
