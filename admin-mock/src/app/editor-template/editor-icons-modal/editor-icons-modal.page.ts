import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

import { Icon } from 'src/app/model/icon';
import { Template } from 'src/app/model/template';
import { EditorIconsModalService } from './editor-icons-modal.service';

@Component({
  selector: 'app-editor-icons-modal',
  templateUrl: './editor-icons-modal.page.html',
  styleUrls: ['./editor-icons-modal.page.scss'],
})
export class EditorIconsModalPage implements OnInit {

  canvas: Canvas
  template: Template
  icons: Icon[] = []

  subscription$: Subscription

  constructor(
    private navParams: NavParams,
    private iconsService: EditorIconsModalService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.getParams().finally(() => {
      this.getIcons()
    })
  }

  async getParams() {
    this.canvas = await this.navParams.get('canvas')
    this.template = await this.navParams.get('template')
  }

  getIcons() {
    this.subscription$ = this.iconsService.getIcons(this.template.id_brand, 'pt')
      .subscribe(icons => {
        icons.forEach(ic => this.icons.push(ic))
      })
  }

  addIcon(icon) {

    fabric.loadSVGFromURL(icon.image_url, (objects, options) => {
      var obj = fabric.util.groupSVGElements(objects, { crossOrigin: 'Anonymous' })

      obj.scaleToWidth(this.canvas.getWidth() / 6)
      obj.top = 10
      obj.left = 10
      obj.cornerStyle = 'circle'
      obj.cornerSize = 20
      obj.lockUniScaling = true
      obj.lockUniScaling = true
      obj.lockMovementX = false
      obj.lockMovementY = false
      obj.lockRotation = false
      obj.lockScalingX = false
      obj.lockScalingY = false
      obj.setOptions({ controls: 'icons' })

      this.canvas.add(obj).renderAll();
    })

    this.closeModal()
  }

  loadErrorImg(event) {
    event.target.src = 'assets/img/erro-product.jpg';
  }

  closeModal() {
    this.modalController.dismiss()
  }
}
