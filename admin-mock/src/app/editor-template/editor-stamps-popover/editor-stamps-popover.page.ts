import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Canvas } from 'fabric/fabric-impl';

@Component({
  selector: 'app-editor-stamps-popover',
  templateUrl: './editor-stamps-popover.page.html',
  styleUrls: ['./editor-stamps-popover.page.scss'],
})
export class EditorStampsPopoverPage implements OnInit {

  canvas: Canvas
  object: fabric.Image

  lockMovement = false
  lockRotation = false
  lockSize = false

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.canvas = this.navParams.get('canvas')
    this.object = this.navParams.get('object')
    
    this.lockMovement = this.object.lockMovementX
    this.lockRotation = this.object.lockRotation
    this.lockSize = this.object.lockScalingX
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
