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
    fabric.Image.fromURL(this.template, (template) => {
      template.scaleToHeight(this.canvas.getHeight())
      // template.width = this.canvas.getWidth()
      // template.height = this.canvas.getHeight()
      this.canvas.setOverlayImage(template, this.canvas.renderAll.bind(this.canvas))
    })

    this.setImageOnCanvas(this.product1)
    this.setImageOnCanvas(this.product2)
    this.setTextOnCanvas('hello world')

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
      translucent: true,
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
      translucent: true,
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
