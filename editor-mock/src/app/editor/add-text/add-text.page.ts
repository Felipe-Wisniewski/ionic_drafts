import { Component, OnInit } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.page.html',
  styleUrls: ['./add-text.page.scss'],
})
export class AddTextPage implements OnInit {

  
  fonts = ['Arial', 'Calibri', 'Roboto', 'Times New Roman', 'Verdana']

  canvas: Canvas
  objText: any
  text = ''
  textFont = ''
  textSize = ''
  textColor = ''
  textOpacity = 0

  selectedText = false
  selectedFont = false
  selectedSize = false
  selectedColor = false
  selectedOpacity = false

  constructor(private navParams: NavParams) { }

  ngOnChanges() {
    console.log('On  Changes')
  }

  ngOnInit() {
    console.log('ngOnInit')
    this.canvas = this.navParams.get('canvas')
    this.objText = this.navParams.get('objText')
    this.setTextSettings()
  }

  setTextSettings() {
    console.log(this.objText)
    console.log(this.objText.text)
    console.log(this.objText.fontFamily)
    console.log(this.objText.fontSize)
    console.log(this.objText.fill)
    console.log(this.objText.opacity)
    console.log('----------------------------------------')
    this.text = this.objText.text
    this.textFont = this.objText.fontFamily
    this.textSize = this.objText.fontSize
    this.textColor = this.objText.fill
    this.textOpacity = this.objText.opacity
  }

  setParamsText() {
    this.objText.text = this.text
    this.objText.fontFamily = this.textFont
    this.objText.fontSize = this.textSize
    this.objText.fill = this.textColor
    this.objText.opacity = this.textOpacity
    this.canvas.renderAll()
  }

  openTool(choose) {

    switch (choose) {
      case 'text': {
        this.closeTools()
        this.selectedText = true
        break
      }

      case 'font': {
        this.closeTools()
        this.selectedFont = true
        break
      }

      case 'size': {
        this.closeTools()
        this.selectedSize = true
        break
      }

      case 'color': {
        this.closeTools()
        this.selectedColor = true
        break
      }

      case 'opacity': {
        this.closeTools()
        this.selectedOpacity = true
        break
      }

      default: {
        break
      }
    }
  }

  closeTools() {
    this.selectedText = false
    this.selectedFont = false
    this.selectedSize = false
    this.selectedColor = false
    this.selectedOpacity = false
  }
}