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

  async addItem(choose) {
    const modal = await this.modalController.create({
      component: AddItemsModalPage,
      componentProps: {
        choose: choose
      }
    })

    modal.onDidDismiss().then((item) => {
      console.log('modal')
      console.log(this.objItem)
      console.log(choose)
      console.log(item.data.choose.image_url)
      let itemUrl = item.data.choose.image_url

      switch (choose) {
        case 'brand': {
                    
          break
        }
        case 'logo': {
          // this.homeService.getUserLogos()
          break
        }
        case 'stamps': {
          
          break
        }
        case 'icons': {
          
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

  setLogoBrand(imgUrl: string) {
    fabric.Image.fromURL(imgUrl, (img) => {
      img.scaleToWidth(this.canvas.getWidth() / 2.5)
      img.top = this.canvas.getHeight() - ((img.scaleY * img.height) + 20)
      img.left = 20
      img.cornerStyle = 'circle'
      img.cornerSize = 20
      img.lockUniScaling = true
      img.setOptions({ controls: 'brand-logos' })
      this.canvas.add(img)
      this.canvas.setOverlayImage(img, this.canvas.renderAll.bind(this.canvas)).setActiveObject(img)
    })
  }

  closePopover() {
    this.popoverController.dismiss()
  }
}
