import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';

import { EditorService } from './editor.service';
import { Brand } from '../model/brand';
import { Template } from '../model/template';
import { Post } from '../model/post';
import { Product } from '../model/product';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit, OnDestroy {

  canvas: Canvas
  layout = ''
  title = ''
  brand: Brand
  template: Template
  post: Post
  products: Product[] = []

  constructor(private editorService: EditorService, 
    private modalController: ModalController,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas')
    this.getSelectedChoices()
      .then(() => {
        console.log("99")
        this.loadCanvasDimensions()
      })
      .then(() => {
        console.log("100")
      })
  }

  async getSelectedChoices() {
    await this.editorService.getBrandStorage()
      .then((brand) => {
        console.log("1")
        this.brand = brand
        this.title = this.brand.brand
      })
      .catch((err) => {
        console.log('getBrand error', err)
      })

    await this.editorService.getTemplateStorage()
      .then((template) => {
        console.log("2")
        this.template = template
        this.layout = this.template.layout
      })
      .catch(() => {
        this.template = null
      })

    await this.editorService.getPostStorage()
      .then((post) => {
        console.log("3")
        this.post = post
        this.layout = this.post.layout
      })
      .catch(() => {
        this.post = null
      })

    await this.editorService.getProductsStorage()
      .then((products) => {
        console.log("4")
        products.forEach(p => {
          this.products.push(p)
        })
      })
      .catch((err) => {
        console.log('getProduct', err)
      })
  }

  loadCanvasDimensions() {
    console.log("5")
    this.editorService.setCanvasDimensions(this.canvas, this.layout).then(() => {
      console.log("6")
      this.template != null ?  this.loadTemplate() : this.loadPost()
    })
  }

  loadTemplate() {
    console.log("7")
    this.editorService.setTemplateOnCanvas(this.canvas, this.template.json).then((it) => {
      console.log("8")
      console.log(it)
    })
    console.log("9")
    this.editorService.setProductsOnCanvas(this.canvas, this.products)    
    console.log("10")
  }

  loadPost() {
    this.editorService.setPostOnCanvas(this.canvas, this.post.post_url, this.brand.logo_url).then((post) => {
      console.log('posts ok', post)
    })
  }

  setImageOnCanvas(imgUrl: string) {

  }

  share() {

  }

  openChangeProduct() {

  }

  async openOptionsAddItems() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Insert items',
      buttons: [
        {
          text: 'Brand logos',
          icon: 'photos',
          handler: () => {
            this.addItemsModal()
          }
        },
        {
          text: 'Your logo',
          icon: 'image',
          handler: () => {
            this.addItemsModal()
          }
        },
        {
          text: 'Stamps',
          icon: 'pricetags',
          handler: () => {
            this.addItemsModal()
          }
        },
        {
          text: 'Icons',
          icon: 'information',
          handler: () => {
            this.addItemsModal()
          }
        }
      ]
    });
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
        this.setImageOnCanvas(image)
      }
    })
    return await modal.present()
  }

  openOptionsEditText() {

  }

  deleteObjectOnCanvas() {

  }

  ngOnDestroy() {
  }
}
