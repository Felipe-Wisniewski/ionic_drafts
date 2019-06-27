import { Component, OnInit, OnDestroy } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.page.html',
  styleUrls: ['./add-text.page.scss'],
})
export class AddTextPage implements OnInit, OnDestroy {


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
    { name: 'Roboto', fontFamily: 'Roboto' }
  ]

  canvas: Canvas
  objText: fabric.Text
  text = ''
  textFont: string
  textSize: number
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

    this.objText = this.navParams.get('objectSelected')
    this.setTextSettings()
  }

  setTextSettings() {
    this.text = this.objText.text
    this.textFont = this.objText.fontFamily
    this.textSize = this.objText.fontSize
    this.textColor = this.objText.fill.toString()
    this.textOpacity = this.objText.opacity
  }

  setParamsText() {
    this.objText.text = this.text
    this.objText.fontSize = this.textSize
    this.objText.fill = this.textColor
    this.objText.opacity = this.textOpacity
    this.canvas.renderAll()
  }

  setFont() {
    console.log('AddFont', this.textFont)
    this.objText.set("fontFamily", this.textFont)
    this.canvas.renderAll()
  }

  ngOnDestroy() {
    console.log('AddText ngOnDestroy')
  }
}