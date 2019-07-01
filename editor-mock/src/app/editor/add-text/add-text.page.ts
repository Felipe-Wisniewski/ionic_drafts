import { Component, OnInit, OnDestroy } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { NavParams, PopoverController } from '@ionic/angular';

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
    { name: 'Roboto', fontFamily: 'Roboto' },
    { name: 'Times New Roman', fontFamily: 'Times New Roman' }
  ]

  canvas: Canvas
  obj: any
  objItem: any

  text = ''
  textFont = 'Abadi'
  textSize = 50
  textColor = '#040000'
  textOpacity = 1

  textEnabled = false
  fontEnabled = false
  sizeEnabled = false
  colorEnabled = false
  opacityEnabled = false

  constructor(private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnInit() {
    this.canvas = this.navParams.get('canvas')
    this.obj = this.navParams.get('objText')
    this.setTextSettings()
  }

  setTextSettings() {
    if (this.obj == null || this.obj.controls != 'text') {

      this.textEnabled = true

      this.objItem = new fabric.Text('', {
        top: 0,
        left: 0,
        evented: true,
        selectable: true,
        cornerSize: 20,
        cornerStyle: "circle",
        lockUniScaling: true,
        lockScalingX: true,
        lockScalingY: true,
        fillRule: "nonzero",
        paintFirst: "fill",
        globalCompositeOperation: "source-over",
        type: "text",
        fontSize: this.textSize,
        fontFamily: this.textFont,
        fill: this.textColor,
        opacity: this.textOpacity,
        
      })
      this.objItem.setOptions({ 
        controls: 'text',
        removable: true
      })

      this.canvas.add(this.objItem).renderAll()

    } else {
      this.objItem = this.obj
      
      this.text = this.objItem.text
      this.textFont = this.objItem.fontFamily
      this.textSize = this.objItem.fontSize
      this.textColor = this.objItem.fill.toString()
      this.textOpacity = this.objItem.opacity
      
      this.textEnabled = true
      this.fontEnabled = true
      this.sizeEnabled = true
      this.colorEnabled = true
      this.opacityEnabled = true
    }
  }
  
  setText() {
    if (this.text == '') {
      this.fontEnabled = false
      this.sizeEnabled = false
      this.colorEnabled = false
      this.opacityEnabled = false
      
      this.objItem.text = ''
      this.canvas.renderAll()    

    } else {
      this.fontEnabled = true
      this.sizeEnabled = true
      this.colorEnabled = true
      this.opacityEnabled = true
      
      this.objItem.text = this.text
      this.canvas.renderAll()      
    }
  }
  
  setFontFamily() {
    this.objItem.set("fontFamily", this.textFont)
    this.canvas.renderAll()
  }

  setFontSize() {
    this.objItem.fontSize = this.textSize
    this.canvas.renderAll()
  }

  setTextColor() {
    this.objItem.set('fill', this.textColor)
    this.canvas.renderAll()
  }

  setTextOpacity() {
    this.objItem.opacity = this.textOpacity
    this.canvas.renderAll()
  }

  ngOnDestroy() {
    if (this.objItem.text == '') {
      this.canvas.remove(this.objItem)
      this.canvas.renderAll()
    } else {
      console.log(this.objItem)
      this.canvas.setActiveObject(this.objItem)
      this.canvas.renderAll()
    }
  }
}