import { Component, OnInit } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { NavParams, ModalController, PopoverController } from '@ionic/angular';
import { Template } from 'src/app/model/template';
import { EditorBackgroundPage } from '../editor-background/editor-background.page';

@Component({
  selector: 'app-editor-background-popover',
  templateUrl: './editor-background-popover.page.html',
  styleUrls: ['./editor-background-popover.page.scss'],
})
export class EditorBackgroundPopoverPage implements OnInit {

  canvas: Canvas
  template: Template
  objBackground: any
  color = { r: 0, g: 0, b: 0 }

  colors = [
    { color: '#ffffff' }, { color: "#ecf0f1" }, { color: '#b2b2b2' }, { color: "#95a5a6" },
    { color: "#bdc3c7" }, { color: "#7f8c8d" }, { color: "#000000" }, { color: "#F1A9A0" },
    { color: "#D2527F" }, { color: "#f1c40f" }, { color: "#f39c12" }, { color: "#e67e22" },
    { color: "#d35400" }, { color: "#e74c3c" }, { color: "#c0392b" }, { color: "#6D4C41" },
    { color: "#3E2723" }, { color: "#1abc9c" }, { color: "#16a085" }, { color: "#2ecc71" },
    { color: "#27ae60" }, { color: "#3498db" }, { color: "#2980b9" }, { color: "#34495e" },
    { color: "#2c3e50" }, { color: "#9b59b6" }, { color: "#8e44ad" }
  ]

  hideBackground = false
  colorChoose = ''

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.canvas = this.navParams.get('canvas')
    this.template = this.navParams.get('template')
    this.objBackground = this.navParams.get('objBackground')

    console.log(this.canvas.backgroundColor.toString())
    this.colorChoose = this.canvas.backgroundColor.toString()
    this.color = this.hexToRGB(this.colorChoose);
    // this.hideBackground = this.objBackground.lockMovementX
  }

  async changeBackground() {
    const modal = await this.modalController.create({
      component: EditorBackgroundPage,
      componentProps: {
        canvas: this.canvas,
        template: this.template
      }
    })
    
    modal.onDidDismiss().then(() => {
      this.closePopover()
    })

    return await modal.present()
  }

  setHideBackground() {
    // this.canvas.
    // this.objBackground.set("lockMovementX", this.lockMovement)
  }

  selectedColor(color) {
    this.colorChoose = color;
    this.color = this.hexToRGB(color);
    this.canvas.backgroundColor = color
    this.canvas.renderAll()
  }

  setRgb() {
    this.colorChoose = `#${this.rgbToHex(this.color.r, this.color.g, this.color.b)}`
    this.canvas.backgroundColor = this.colorChoose
    this.canvas.renderAll()
  }

  hexToRGB(hex) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  }

  rgbToHex(r, g, b) {
    let bin = r << 16 | g << 8 | b;
    return ((h) => new Array(7 - h.length).join("0") + h)(bin.toString(16).toUpperCase())
  }

  closePopover() {
    this.popoverController.dismiss()
  }
}
