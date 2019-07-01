import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, PopoverController } from '@ionic/angular';
import { Canvas } from 'fabric/fabric-impl';

@Component({
  selector: 'app-product-popover',
  templateUrl: './product-popover.page.html',
  styleUrls: ['./product-popover.page.scss'],
})
export class ProductPopoverPage implements OnInit {

  canvas: Canvas
  objItem: fabric.Object
  controls: any
  ref = ''

  refEnabled: boolean
  productEnabled: boolean

  constructor(private navParams: NavParams, private modalController: ModalController, private popoverController: PopoverController) { }

  ngOnInit() {
    this.canvas = this.navParams.get('canvas')
    this.objItem = this.navParams.get('objItems')
    this.controls = this.navParams.get('controls')
    this.ref = this.navParams.get('ref')
    
    this.setControls()
  }
  
  setControls() {
    if (this.ref != '') {
      this.refEnabled = true
      let r = this.ref.split('-')
      this.ref = `#REF:${r[0]}-${r[1]}`
    }

    if (this.controls.general) {
      this.productEnabled = this.controls.general
      this.refEnabled = this.controls.general
      let r = this.objItem.ref.split('-')
      this.ref = `#REF:${r[0]}-${r[1]}`
    }
  }

  addRef() {
    console.log(this.ref)
    
  }

  openProducts() {
    console.log('openProd')
    console.log(this.objItem)
  }
}
