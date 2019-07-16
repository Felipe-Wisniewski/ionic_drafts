import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

@Component({
  selector: 'app-editor-icons-popover',
  templateUrl: './editor-icons-popover.page.html',
  styleUrls: ['./editor-icons-popover.page.scss'],
})
export class EditorIconsPopoverPage implements OnInit {

  canvas: Canvas
  object: any

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

  lockMovement = false
  lockRotation = false
  lockSize = false
  colorChoose = ''

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.canvas = this.navParams.get('canvas')
    this.object = this.navParams.get('object')
    console.log(this.object)
    this.colorChoose = this.object.fill
    this.lockMovement = this.object.lockMovementX
    this.lockRotation = this.object.lockRotation
    this.lockSize = this.object.lockScalingX
  }

  selectedColor(color) {
    this.colorChoose = color;
    this.color = this.hexToRGB(color);
    console.log(this.color)
    console.log(color)
    this.object.set("fill", color)
    this.canvas.renderAll()
  }

  setRgb() {
    this.colorChoose = `#${this.rgbToHex(this.color.r, this.color.g, this.color.b)}`
    this.object.set("fill", this.colorChoose)
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

  colorSelect() {
    this.object.set("fill", this.colorChoose)
    this.canvas.renderAll()
  }

  setLockMovement() {
    this.object.set("lockMovementX", this.lockMovement)
    this.object.set("lockMovementY", this.lockMovement)
  }

  setLockRotation() {
    this.object.set("lockRotation", this.lockRotation)
  }

  setLockSize() {
    this.object.set("lockScalingX", this.lockSize)
    this.object.set("lockScalingY", this.lockSize)
  }
}
