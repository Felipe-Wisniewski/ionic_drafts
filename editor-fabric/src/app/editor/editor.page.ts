import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

import { Brand } from '../model/brand';
import { Template } from '../model/template';
import { Post } from '../model/post';
import { Product } from '../model/product';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  brand: Brand
  template: Template
  products: Product[]
  post: Post

  canvas: Canvas

  constructor(private storage: Storage) { 
    
  }

  ngOnInit() {
    this.getChoose()
  }

  getChoose() {
    this.storage.forEach((value, key, n) => {
      switch(key) {
        case 'brand': {
          this.brand = value
          break
        }

        case 'template': {
          this.template = value
          break
        }

        case 'products': {
          this.products = value
          break
        }

        case 'post': {
          this.post = value
          break
        }
      }
    }).then(() => {
      if (this.template != null || this.template != undefined) {
        this.getTemplateMeasures()    
      } else {
        this.getPostMeasures()
      }
    })
  }

  getPostMeasures() {
    this.canvas = new fabric.Canvas('canvas')
    let imageBgUrl = this.post.post_url

    let header = document.getElementsByTagName('ion-header').item(0).clientHeight
    let footer = document.getElementsByTagName('ion-footer').item(0).clientHeight
    let widthScreen = parent.innerWidth
    let heightScreen = parent.innerHeight - (header + footer)

    if (this.post.layout != 'post') {
      if (widthScreen > heightScreen) {
        this.canvas.setDimensions({ width: heightScreen, height: heightScreen })  
      } else {
        this.canvas.setDimensions({ width: widthScreen, height: widthScreen })  
      }

    } else {
      imageBgUrl = 'https://learn.canva.com/wp-content/uploads/2018/06/Xpress-Classes-1.png'

      let width = (1080 / 1920) * heightScreen
      console.log(`width ${width} x height ${heightScreen} / widtBigger ${width}`)
      this.canvas.setDimensions({ width: width, height: heightScreen })
    }

    fabric.Image.fromURL(imageBgUrl, (post) => {
      post.scaleToHeight(this.canvas.getHeight())
      this.canvas.setOverlayImage(post, this.canvas.renderAll.bind(this.canvas))
    })
  }

  getTemplateMeasures() {

  }
}
