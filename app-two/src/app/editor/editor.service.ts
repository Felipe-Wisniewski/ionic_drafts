import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import * as FontFaceObserver from 'fontfaceobserver';

import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  url = `${environment.URL_API}` 

  constructor(private storage: Storage) { }

  async getBrandStorage() {
    const resp = await this.storage.get('brand')
    if (resp == null) throw Error('Error')
    return await resp
  }

  async getTemplateStorage() {
    const resp = await this.storage.get('template')
    if (resp == null) throw Error('Error')
    return await resp
  }

  async getPostStorage() {
    const resp = await this.storage.get('post')
    if (resp == null) throw Error('Error')
    return await resp
  }

  async getProductsStorage() {
    const resp = await this.storage.get('products')
    if (resp == null) throw Error('Error')
    return await resp
  }

  async setCanvasDimensions(canvas: Canvas, layout: string) {
    console.log(`header ${document.getElementsByTagName('ion-header').item(0).clientHeight} / footer ${document.getElementsByTagName('ion-footer').item(0).clientHeight}`)
    let header = document.getElementsByTagName('ion-header').item(0).clientHeight
    let footer = document.getElementsByTagName('ion-footer').item(0).clientHeight
    let widthScreen = parent.innerWidth
    let heightScreen = parent.innerHeight - (header + footer)
    let width = 0
    let height = 0

    if (layout == 'post') {
      if (widthScreen > heightScreen) {
        width = heightScreen
        height = heightScreen
      } else {
        width = widthScreen
        height = widthScreen
      }
    }

    if (layout == 'story') {
      width = (1080 / 1920) * heightScreen
      height = heightScreen
    }
    await canvas.setDimensions({ width: width, height: height })
  }

  async setTemplateOnCanvas(canvas: Canvas, json) {
    const fonts = []
    var mainObject = null

    json.objects.forEach(obj => {
      obj.scaleX = obj.scaleX / 100 * canvas.getWidth()
      obj.scaleY = obj.scaleY / 100 * canvas.getHeight()
      obj.top = obj.top / 100 * canvas.getHeight()
      obj.left = obj.left / 100 * canvas.getWidth()
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
        mainObject = obj
      }
      console.log("json obj -> ", obj)
    })

    await canvas.loadFromJSON(json, () => {
      canvas.renderAll.bind(canvas)
      return mainObject
    })    
  }
  
  async setProductsOnCanvas(canvas: Canvas, products: Product[]) {
    if (products.length > 1) {
      await fabric.Image.fromURL(products[0].image_url, (prod1) => {
        prod1.scaleToWidth(canvas.getWidth() / 2)
        prod1.top = 0
        prod1.left = 0
        canvas.add(prod1)
      })
      
      await fabric.Image.fromURL(products[1].image_url, (prod2) => {
        prod2.scaleToWidth(canvas.getWidth() / 2)
        prod2.top = canvas.getHeight() / 2
        prod2.left = canvas.getWidth() / 2
        canvas.add(prod2)
      })
    
    } else {
      await fabric.Image.fromURL(products[0].image_url, (prod) => {
        prod.scaleToWidth(canvas.getWidth())
        prod.center()
        canvas.add(prod)
        console.log("prod add")
      })
    }
  }

  async setPostOnCanvas(canvas: Canvas, postUrl: string, logoUrl: string) {
    const _post = fabric.Image.fromURL(postUrl, (img) => {
      console.log(img)
      img.scaleToHeight(canvas.getHeight())
      img.scaleToWidth(canvas.getWidth())
      img.center()
      //lockMovement = true
    })
    
    const _logo = fabric.Image.fromURL(logoUrl, (img) => {
      img.scaleToWidth(canvas.getWidth() / 4)
      img.cornerStyle = 'circle'
      img.top = canvas.getHeight() - (img.height + 5)
      img.left = 5 
    })
      
    canvas.add(_post, _logo)
    await canvas.renderAll()
  }

  addMainImage(mainImage: string, canvas: Canvas) {
    fabric.Image.fromURL(mainImage, (img) => {
      img.scaleToHeight(canvas.getHeight())
      img.width = canvas.getWidth()
      img.height = canvas.getHeight()
      canvas.setOverlayImage(img, canvas.renderAll.bind(canvas))
    })
  }

  addImageOnCanvas(canvas: Canvas, url: string) {
    fabric.Image.fromURL(url, (img) => {
      img.scaleToWidth(canvas.getWidth() / 2)
      img.cornerStyle = 'circle'
      img.lockUniScaling = true

      img.on('selected', (it) => {
        console.log(`selected => ${it}`)
      })

      canvas.add(img).centerObject(img)
      canvas.renderAll()
    })
  }
}