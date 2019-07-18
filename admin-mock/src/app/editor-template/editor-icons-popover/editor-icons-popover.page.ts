import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Canvas } from 'fabric/fabric-impl';

import { ColorsPopoverPage } from '../colors-popover/colors-popover.page';

@Component({
  selector: 'app-editor-icons-popover',
  templateUrl: './editor-icons-popover.page.html',
  styleUrls: ['./editor-icons-popover.page.scss'],
})
export class EditorIconsPopoverPage implements OnInit {

  canvas: Canvas
  object: any

  lockMovement = false
  lockRotation = false
  lockSize = false
  lockColor = false

  constructor(private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnInit() {
    this.canvas = this.navParams.get('canvas')
    this.object = this.navParams.get('object')

    this.lockMovement = this.object.lockMovementX
    this.lockRotation = this.object.lockRotation
    this.lockSize = this.object.lockScalingX
    this.lockColor = this.object.changeColor
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

  setLockColor() {
    this.object.set("changeColor", this.lockColor)
  }

  async setTextColor() {
    const popover = await this.popoverController.create({
      component: ColorsPopoverPage,
      animated: true,
      translucent: true,
      mode: "md",
      componentProps: {
        canvas: this.canvas,
        object: this.object
      }
    })
    return await popover.present()
  }
}
