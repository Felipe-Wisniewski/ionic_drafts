import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, PopoverController } from '@ionic/angular';
import { Canvas } from 'fabric/fabric-impl';

import { Template } from 'src/app/model/template';
import { EditorBackgroundPage } from '../editor-background/editor-background.page';
import { ColorsPopoverPage } from '../colors-popover/colors-popover.page';

@Component({
  selector: 'app-editor-background-popover',
  templateUrl: './editor-background-popover.page.html',
  styleUrls: ['./editor-background-popover.page.scss'],
})
export class EditorBackgroundPopoverPage implements OnInit {

  canvas: Canvas
  template: Template
  objBackground: any
  
  hideBackground = false

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.canvas = this.navParams.get('canvas')
    this.template = this.navParams.get('template')
    this.objBackground = this.navParams.get('objBackground')
    
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
  
  async setTextColor() {
    const popover = await this.popoverController.create({
      component: ColorsPopoverPage,
      animated: true,
      translucent: true,
      mode: "md",
      componentProps: {
        canvas: this.canvas,
        object: null
      }
    })
    return await popover.present()
  }

  closePopover() {
    this.popoverController.dismiss()
  }
}