import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FontFaceObserver } from 'fontfaceobserver';
import { fabric } from 'fabric';

import { environment } from 'src/environments/environment';
import { Canvas } from 'fabric/fabric-impl';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  url = `${environment.URL_API}` 

  constructor() { }

  setCanvasDimensions(canvas, layout) {
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

    console.log(`${width} x ${height}`)
    canvas.setDimensions({ width: width, height: height })
  }

  setTemplateOnCanvas(canvas, json) {
    const fonts = []

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
        console.log('text')
        const font = new FontFaceObserver(obj.fontFamily)
        fonts.push(font.load().catch(err => {
          obj.fontFamily = 'Roboto'
        }))
      }

    })
    canvas.loadFromJSON(json, canvas.renderAll.bind(canvas))
  }

  //TODO !!!!!!!!!!
  setPostOnCanvas(canvas: Canvas, post, logo) {

    let _post = fabric.Image.fromURL(post, (img) => {
      console.log(img)
      img.scaleToHeight(canvas.getHeight())
      img.scaleToWidth(canvas.getWidth())
      img.center()
    })
    
    let _logo = fabric.Image.fromURL(logo, (img) => {
      console.log(img)
      img.cornerStyle = 'circle'
    })
      
    canvas.add(_post, _logo)
    canvas.renderAll()
  }

  setImageOnCanvas(canvas, url) {
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
