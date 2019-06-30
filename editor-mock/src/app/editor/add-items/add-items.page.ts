import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, ModalController } from '@ionic/angular';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { AddItemsModalPage } from '../add-items-modal/add-items-modal.page';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.page.html',
  styleUrls: ['./add-items.page.scss'],
})
export class AddItemsPage implements OnInit {

  canvas: Canvas
  objItem: fabric.Object
  controls: any
  brandEnabled: boolean
  logoEnabled: boolean
  stampsEnabled: boolean
  iconsEnabled: boolean

  constructor(private navParams: NavParams, private modalController: ModalController, private popoverController: PopoverController) { }

  ngOnInit() {
    this.canvas = this.navParams.get('canvas')
    this.objItem = this.navParams.get('objItems')
    this.controls = this.navParams.get('controls')
    this.setControls()
  }

  setControls() {
    this.brandEnabled = this.controls.brandLogos
    this.logoEnabled = this.controls.gallery
    this.stampsEnabled = this.controls.stamps
    this.iconsEnabled = this.controls.icons
  }

  async openOption(option) {
    const modal = await this.modalController.create({
      component: AddItemsModalPage,
      componentProps: {
        option: option
      }
    })
    
    modal.onDidDismiss().then((item) => {
      switch (option) {
        case 'brand': {
          this.setLogoBrand(item.data.choose.image_url)
          break
        }
        case 'logo': {
          // this.homeService.getUserLogos()
          break
        }
        case 'stamps': {
          this.setStamp(item.data.choose.image_url)
          break
        }
        case 'icons': {
          this.setIcons(item.data.choose.image_url)
          break
        }
        default: {
          break
        }
      }
      this.closePopover()
    })
    return await modal.present()
  }
  
  setLogoBrand(imageUrl: string) {
    let top = this.objItem.top
    let left = this.objItem.left
    let scaleToWidth = this.objItem.getScaledWidth()

    fabric.Image.fromURL(imageUrl, (img) => {
      img.scaleToWidth(scaleToWidth)
      img.top = top
      img.left = left
      img.cornerStyle = 'circle'
      img.cornerSize = 20
      img.lockUniScaling = true
      img.setOptions({ controls: 'brand-logos' })
      this.canvas.add(img)
      this.canvas.remove(this.objItem)
      this.canvas.setOverlayImage(img, this.canvas.renderAll.bind(this.canvas)).setActiveObject(img)
    })
  }

  setLogoOwn() {

  }

  setStamp(imageUrl: string) {

  }

  setIcons(imageUrl: string) {

  }

  closePopover() {
    this.popoverController.dismiss()
  }
}
