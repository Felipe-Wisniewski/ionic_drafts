import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

@Component({
  selector: 'app-editor-text-popover',
  templateUrl: './editor-text-popover.page.html',
  styleUrls: ['./editor-text-popover.page.scss'],
})
export class EditorTextPopoverPage implements OnInit {

  fonts = [
    { name: 'Abadi', fontFamily: 'Abadi' },
    { name: 'Always In My Heart', fontFamily: 'AlwaysInMyHeart' },
    { name: 'Amaranth', fontFamily: 'Amaranth' },
    { name: 'Asap', fontFamily: 'Asap' },
    { name: 'Bebas', fontFamily: 'Bebas' },
    { name: 'Champagne & Limousines', fontFamily: 'ChampagneLimousines' },
    { name: 'Dulcelin', fontFamily: 'Dulcelin' },
    { name: 'GuldScript', fontFamily: 'GuldScript' },
    { name: 'Helvetica', fontFamily: 'Helvetica' },
    { name: 'Helvetica Neue', fontFamily: 'HelveticaNeue' },
    { name: 'Humanist Bold', fontFamily: 'HumanistBold' },
    { name: 'Roboto', fontFamily: 'Roboto' },
    { name: 'Times New Roman', fontFamily: 'Times New Roman' }
  ]

  canvas: Canvas
  objFabric: any
  objText: any

  text = ''
  textFont = 'Abadi'
  textSize = 50
  textColor = '#000000'
  textOpacity = 1

  textEnabled = false
  fontEnabled = false
  sizeEnabled = false
  colorEnabled = false
  opacityEnabled = false

  constructor(
    private navParams: NavParams, 
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.canvas = this.navParams.get('canvas')
    this.objFabric = this.navParams.get('object')
    this.setTextSettings()
  }

  setTextSettings() {

    if (this.objFabric == null || this.objFabric.type != 'text') {

      this.objText = new fabric.Text('', {
        top: 10,
        left: 10,
        evented: true,
        selectable: true,
        cornerSize: 20,
        cornerStyle: "circle",
        lockUniScaling: true,
        fillRule: "nonzero",
        paintFirst: "fill",
        globalCompositeOperation: "source-over",
        type: "text",
        fontSize: this.textSize,
        fontFamily: this.textFont,
        fill: this.textColor,
        opacity: this.textOpacity,
      })

      this.objText.setOptions({
        controls: 'text',
        removable: true
      })

      this.canvas.add(this.objText).renderAll()
      this.textEnabled = true

    } else {
      this.objText = this.objFabric

      this.text = this.objText.text
      this.textFont = this.objText.fontFamily
      this.textSize = this.objText.fontSize
      this.textColor = this.objText.fill
      this.textOpacity = this.objText.opacity

      this.objText.controls === 'reference' ? this.textEnabled = false : this.textEnabled = true
      this.fontEnabled = true
      this.sizeEnabled = true
      this.colorEnabled = true
      this.opacityEnabled = true
    }
  }

  setText() {
    if (this.text != '') {
      this.fontEnabled = true
      this.sizeEnabled = true
      this.colorEnabled = true
      this.opacityEnabled = true
    } else {
      this.fontEnabled = false
      this.sizeEnabled = false
      this.colorEnabled = false
      this.opacityEnabled = false
    }
    this.objText.set("text", this.text)
    this.canvas.renderAll()
  }

  setFontFamily() {
    this.objText.set("fontFamily", this.textFont)
    this.canvas.renderAll()
  }

  setFontSize() {
    this.objText.set("fontSize", this.textSize)
    this.canvas.renderAll()
  }

  async setTextColor() {
    /* const popover = await this.popoverController.create({
      component: ColorsPopoverPage,
      animated: true,
      translucent: true,
      mode: "md",
      componentProps: {
        canvas: this.canvas,
        objText: this.objText
      }
    })
    return await popover.present() */
  }

  setTextOpacity() {
    this.objText.set("opacity", this.textOpacity)
    this.canvas.renderAll()
  }

  ngOnDestroy() {
    if (this.objText.text === '') {
      this.canvas.remove(this.objText)
      this.canvas.renderAll()
    } else {
      this.canvas.setActiveObject(this.objText)
      this.canvas.renderAll()
    }
  }
}