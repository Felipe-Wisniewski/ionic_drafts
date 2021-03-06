import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Canvas } from 'fabric/fabric-impl';

@Component({
  selector: 'app-fonts-popover',
  templateUrl: './fonts-popover.page.html',
  styleUrls: ['./fonts-popover.page.scss'],
})
export class FontsPopoverPage implements OnInit {
  
  canvas: Canvas
  object: any

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

  constructor(private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnInit() {
    this.canvas = this.navParams.get('canvas')
    this.object = this.navParams.get('object')
  }

  setFont(font) {
    this.object.set('fontFamily', font.fontFamily)
    this.canvas.renderAll()
    this.closePopover()
  }

  closePopover() {
    this.popoverController.dismiss()
  }
}