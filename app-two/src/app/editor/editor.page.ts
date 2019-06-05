import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { Subscription } from 'rxjs';

import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit, OnDestroy {

  canvas: Canvas
  subscription$: Subscription[] = []

  title = ''
  logo = ''
  template: any
  post = null
  product_one: any
  product_two: any
  layout = ''

  constructor(private storage: Storage, private editorService: EditorService) { }

  ngOnInit() {
    this.getChoose()
  }

  getChoose() {
    this.storage.get('post').then((_post) => {
      if (_post != null || _post != undefined) {
        this.post = _post.post_url
        this.layout = _post.layout
        this.setCanvasDimensions()
      }
    })

    this.storage.get('template').then((_template) => {
      if (_template != null || _template != undefined) {
        this.layout = _template.layout
        this.subscription$.push(this.editorService.getTemplate(_template.id_template)
          .subscribe(_t => {
            this.template = _t
            this.setCanvasDimensions()
          }))
      }      
    })

    this.storage.get('brand').then((_brand) => {
      if (_brand.brand != null || _brand.brand != undefined) {
        this.title = _brand.brand
      } else {
        this.title = _brand.subdivision
      }
      this.logo = _brand.logo_url
    })

    this.storage.get('products').then((_products) => {
      if (_products != null || _products != undefined) {
        if (_products.size > 1) {
          this.product_one = _products[0]
          this.product_two = _products[1]
        } else {
          this.product_one = _products[0]
        }
      }      
    })
  }

  setCanvasDimensions() {
    this.canvas = this.editorService.setCanvasDimensions(this.layout)
    this.setTemplateOnCanvas()
  }

  setTemplateOnCanvas() {
    if (this.template != null || this.template != undefined) {
      this.canvas.loadFromJSON(this.template.json, (objJson, objFabric) => {
        console.log('j', objJson)
        console.log('f', objFabric)
        this.canvas.renderAll.bind(this.canvas)
      })
    }
    
    if (this.post != null || this.post != undefined) {
      console.log(this.post)
      fabric.Image.fromURL(this.post, (post) => {
        post.scaleToHeight(this.canvas.getHeight())
        this.canvas.setOverlayImage(post, this.canvas.renderAll.bind(this.canvas))
      })
    }
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

  share() {

  }

  openChangeProduct() {

  }

  openOptionsAddItems() {

  }

  openOptionsEditText() {

  }

  deleteObjectOnCanvas() {
    
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe())
  }
}
