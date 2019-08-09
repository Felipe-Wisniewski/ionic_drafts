import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { ColorsPopoverPage } from '../colors-popover/colors-popover.page';
import { FontsPopoverPage } from '../fonts-popover/fonts-popover.page';

@Component({
  selector: 'app-editor-text-popover',
  templateUrl: './editor-text-popover.page.html',
  styleUrls: ['./editor-text-popover.page.scss'],
})
export class EditorTextPopoverPage implements OnInit {

  canvas: Canvas
  objFabric: any
  objText: any

  text = ''
  textFont = 'Abadi'
  textSize = 50
  textMinSize = 0
  textMaxSize = 50
  textColor = '#000000'
  textOpacity = 1

  textSizes = { lower: 14, upper: 150 }

  lockMovement = false
  changeFont = false
  changeColor = false

  textSettingsEnabled = false

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
        lockMovementX: this.lockMovement,
        lockMovementY: this.lockMovement,
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
        changeFont: true,
        changeColor: true,
        removable: true
      })

      this.canvas.add(this.objText).renderAll()

    } else {
      this.objText = this.objFabric
      this.text = this.objText.text
      this.textFont = this.objText.fontFamily
      this.textSize = this.objText.fontSize
      this.textColor = this.objText.fill
      this.textOpacity = this.objText.opacity
      this.lockMovement = this.objText.lockMovementX
      this.changeFont = this.objText.changeFont
      this.changeColor = this.objText.changeColor
      this.textSettingsEnabled = true
    }
  }

  setText() {
    if (this.text != '') {
      this.textSettingsEnabled = true

    } else {
      this.textSettingsEnabled = false
    }
    this.objText.set("text", this.text)
    this.canvas.renderAll()
  }

  async setTextColor() {
    const popover = await this.popoverController.create({
      component: ColorsPopoverPage,
      animated: true,
      translucent: true,
      mode: "md",
      componentProps: {
        canvas: this.canvas,
        object: this.objText
      }
    })
    return await popover.present()
  }

  async setFontFamily() {
    const popover = await this.popoverController.create({
      component: FontsPopoverPage,
      animated: true,
      translucent: true,
      mode: "md",
      componentProps: {
        canvas: this.canvas,
        object: this.objText
      }
    })
    return await popover.present()
  }

  setFontMinMax() {
    console.log(this.textSizes)
  }

  setFontSize() {
    this.objText.set("fontSize", this.textSize)
    this.canvas.renderAll()
  }


  setTextOpacity() {
    this.objText.set("opacity", this.textOpacity)
    this.canvas.renderAll()
  }

  setLockMovements() {
    this.objText.set("lockMovementX", this.lockMovement)
    this.objText.set("lockMovementY", this.lockMovement)
    this.canvas.renderAll()

  }

  setLockFont() {
    this.objText.set("changeFont", this.changeFont)
    this.canvas.renderAll()
  }

  setLockColor() {
    this.objText.set("changeColor", this.changeFont)
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