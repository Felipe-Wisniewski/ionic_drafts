import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

import { Template } from 'src/app/model/template';
import { Stamp } from 'src/app/model/stamp';
import { EditorStampsService } from './editor-stamps.service';

@Component({
  selector: 'app-editor-stamps',
  templateUrl: './editor-stamps.page.html',
  styleUrls: ['./editor-stamps.page.scss'],
})
export class EditorStampsPage implements OnInit {

  canvas: Canvas
  template: Template
  stamps: Stamp[] = []

  subscription$: Subscription

  constructor(private navParams: NavParams, private stampsService: EditorStampsService, private modalController: ModalController) { }

  ngOnInit() {
    this.getParams().finally(() => {
      this.getStamps()
    })
  }

  async getParams() {
    this.canvas = await this.navParams.get('canvas')
    this.template = await this.navParams.get('template')
  }

  getStamps() {
    this.subscription$ = this.stampsService.getStamps(this.template)
      .subscribe(stamps => {
        stamps.forEach(s => this.stamps.push(s))
      })
  }

  addStamp(stamp) {
    fabric.Image.fromURL(stamp.image_url, (img) => {
      img.scaleToWidth(this.canvas.getWidth() / 4)
      img.top = 10
      img.left = 10
      img.cornerStyle = 'circle'
      img.cornerSize = 20
      img.lockUniScaling = true
      img.lockMovementX = false
      img.lockMovementY = false
      img.lockRotation = false
      img.lockScalingX = false
      img.lockScalingY = false
      img.setOptions({ controls: 'stamps' })

      this.canvas.add(img).renderAll()
    }, { crossOrigin: 'Anonymous' })

    this.closeModal()
  }

  loadErrorImg(event) {
    event.target.src = 'assets/img/erro-product.jpg';
  }

  closeModal() {
    this.modalController.dismiss()
  }
}