import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FontFaceObserver } from 'fontfaceobserver';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

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
    return resp
  }

  async getTemplateStorage() {
    const resp = await this.storage.get('template')
    if (resp == null) throw Error('Error')
    return resp
  }

  async getPostStorage() {
    const resp = await this.storage.get('post')
    if (resp == null) throw Error('Error')
    return resp
  }

  async getProductsStorage() {
    const resp = await this.storage.get('products')
    if (resp == null) throw Error('Error')
    return resp
  }

  async setCanvasDimensions(canvas: Canvas, layout: string) {
    let header = document.getElementsByTagName('ion-header').item(0).clientHeight
    let footer = document.getElementsByTagName('ion-footer').item(0).clientHeight
    console.log('header', document.getElementsByTagName('ion-header').item(0).clientHeight)
    console.log('footer', document.getElementsByTagName('ion-footer').item(0).clientHeight)
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

    // console.log(`${width} x ${height}`)
    await canvas.setDimensions({ width: width, height: height })
  }

  async setTemplateOnCanvas(canvas: Canvas, json) {
    const fonts = []
    
    json.objects.forEach(obj => {
      console.log('obj template', obj)
      obj.scaleX = obj.scaleX / 100 * canvas.getWidth()
      obj.scaleY = obj.scaleY / 100 * canvas.getHeight()
      obj.top = obj.top / 100 * canvas.getHeight()
      obj.left = obj.left / 100 * canvas.getWidth()
      obj.lastGoodLeft = obj.left
      obj.lastGoodTop = obj.top
      
      if (!obj.selectable) {
        obj.evented = false
      }

      if (obj.controls == "background") {
        obj.visi
      }

      /* if (obj.type == 'text') {
        const font = new FontFaceObserver(obj.fontFamily)
        fonts.push(font.load().catch(err => {
          obj.fontFamily = 'Roboto'
        }))
      } */

    })
    return canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), (oJson, oFabric) => {
      console.log('---------------------------------------')
      console.log(oJson)
      console.log(oFabric)
    })
  }
  
  async setProductsOnCanvas(canvas: Canvas, products: Product[]) {
    if (products.length > 1) {
      const prod1 = fabric.Image.fromURL(products[0].image_url, (img) => {
        img.scaleToWidth(canvas.getWidth() / 2)
        img.top = 0
        img.left = 0
      })
      
      const prod2 = fabric.Image.fromURL(products[1].image_url, (img) => {
        img.scaleToWidth(canvas.getWidth() / 2)
        img.top = canvas.getHeight() / 2
        img.left = canvas.getWidth() / 2
      })
      console.log('prod1', prod1)
      console.log('prod2', prod2)
      await canvas.add(prod1, prod2)
    } else {
      const prod1 = fabric.Image.fromURL(products[0].image_url, (img) => {
        img.scaleToWidth(canvas.getWidth())
        img.center()
      })
      console.log('prod1', prod1)
      return canvas.add(prod1)
    }
  }

  async setPostOnCanvas(canvas: Canvas, postUrl: string, logoUrl: string) {
    const _post = fabric.Image.fromURL(postUrl, (img) => {
      console.log(img)
      img.scaleToHeight(canvas.getHeight())
      img.scaleToWidth(canvas.getWidth())
      img.center()
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