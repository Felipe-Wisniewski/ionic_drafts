import { Component } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';

import { ShareService } from './share.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  canvas: Canvas
  urlImage = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/6283-3039-5881-29452.jpg'
  fileBase64 = null

  constructor(private shareService: ShareService) { }

  ngOnInit() {
    this.createCanvas()
    this.imageToCanvas()
  }

  share() {
    this.fileBase64 = this.canvas.toDataURL({ format: 'png', multiplier: 2 })

    this.shareService.shareImage(this.fileBase64)
  }

  
  createCanvas() {
    this.canvas = new fabric.Canvas('canvas')
    this.canvas.backgroundColor = '#FFFFFF'
    let widthScreen = parent.innerWidth
    let height = (545 / 800) * widthScreen
    this.canvas.setDimensions({ width: widthScreen, height: height })

    this.canvas.on({
      'touch:gesture': (obj) => {
        console.log(obj)
      }
    })
  }

  imageToCanvas() {
    let imgUrl = this.urlImage.replace(/^https:\/\//i, 'http://')

    fabric.Image.fromURL(imgUrl, (img) => {
      img.scaleToHeight(this.canvas.getHeight())
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas))
    }, { crossOrigin: 'Anonymous' })
  }

  async base64toBlob(fileBase64) {
    let dataBlock = fileBase64.split(";")
    let contentType = dataBlock[0].split(":")[1]
    let base64 = dataBlock[1].split(",")[1]

    const bytes = atob(base64)
    const byteNumbers = new Array(bytes.length)

    for (let i = 0; i < bytes.length; i++)
      byteNumbers[i] = bytes.charCodeAt(i)

    const byteArray = new Uint8Array(byteNumbers)

    const blob = await new Blob([byteArray], { type: contentType })

    return blob;
  }
}




