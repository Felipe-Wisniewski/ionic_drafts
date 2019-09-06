import { FileService } from './../shared/file.service';
import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  canvas: Canvas
  urlImage = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/6283-3039-5881-29452.jpg'
  fileBase64 = null

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.createCanvas()
    this.imageToCanvas()
  }

  putImage() {
    this.fileBase64 = this.canvas.toDataURL({ format: 'png', multiplier: 2 })
    let fileName = `${Math.floor(Math.random() * 1000) + 1}.jpeg`

    this.fileService.base64toBlob(this.fileBase64).then((blob) => {
      this.fileService.saveToDevice(blob, fileName)
    })
  }

  listDir() {
    this.fileService.listDirectories()
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
}