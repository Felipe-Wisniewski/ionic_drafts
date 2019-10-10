import { Component } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  canvas: Canvas
  url = "assets/img/produto.png"
  object = null

  constructor() { }

  ngOnInit() {
    this.createCanvas()
    this.imageToCanvas()
  }

  shadow() {
    if (this.object != null) {
      this.object.setShadow({ color: 'rgba(0,0,0,0.3)' })
      this.canvas.renderAll()
    }
  }


  createCanvas() {
    this.canvas = new fabric.Canvas('canvas')
    this.canvas.backgroundColor = '#FFFFFF'

    let widthScreen = parent.innerWidth
    let height = (545 / 800) * widthScreen
    this.canvas.setDimensions({ width: widthScreen, height: height })

    this.canvas.on({
      'selection:created': (obj) => { this.object = obj.target }
    })
  }

  imageToCanvas() {
    fabric.Image.fromURL(this.url, (img) => {
      img.scaleToHeight(this.canvas.getHeight())
      img.cornerStyle = 'circle'
      img.cornerSize = 20
      img.lockUniScaling = true
      img.evented = true
      img.selectable = true
      this.canvas.add(img).sendToBack(img).renderAll()
    }, { crossOrigin: 'Anonymous' })
  }
}
