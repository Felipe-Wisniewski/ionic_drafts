import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

import { Template } from 'src/app/model/template';
import { Background } from 'src/app/model/background';
import { EditorBackgroundService } from './editor-background.service';

@Component({
  selector: 'app-editor-background',
  templateUrl: './editor-background.page.html',
  styleUrls: ['./editor-background.page.scss'],
})
export class EditorBackgroundPage implements OnInit {

  canvas: Canvas
  objBackground: any = null

  template: Template
  backgrounds: Background[] = []

  subscription$: Subscription[] = []
  loaded = false
  page = 1

  constructor(
    private navParams: NavParams,
    private editorBackgroundService: EditorBackgroundService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.getParams().finally(() => {
      this.getBackgrounds()
    })
  }

  async getParams() {
    this.canvas = await this.navParams.get('canvas')
    this.template = await this.navParams.get('template')


    this.canvas.forEachObject((obj: any) => {
      if (obj.controls == "background") {
        this.objBackground = obj
      }
    })
  }

  getBackgrounds() {
    if (this.template.id_subdivision == null)
      this.loadBackgrounds()
    else
      this.loadBackgroundsSubdvision()
  }

  loadBackgrounds() {
    this.subscription$.push(this.editorBackgroundService.getBackGroundImages(this.template.id_brand, this.template.layout, this.page)
      .subscribe((_backGrounds) => {
        _backGrounds.forEach((bg) => this.backgrounds.push(bg))
        this.loaded = true
      }))
  }

  loadBackgroundsSubdvision() {
    this.subscription$.push(this.editorBackgroundService.getBackGroundImagesSubdvision(this.template.id_subdivision, this.template.layout, this.page)
      .subscribe((_backGrounds) => {
        this.backgrounds.push(_backGrounds)
        this.loaded = true
      }))
  }

  changeBackground(background) {
    
    fabric.Image.fromURL(background.image_url, (img) => {
      let size = img.getOriginalSize()
      size.height > size.width ? img.scaleToHeight(this.canvas.getHeight()) : img.scaleToWidth(this.canvas.getWidth())
      img.selectable = false
      img.evented = false
      img.lockMovementX = true
      img.lockMovementY = true
      img.setOptions({ controls: 'background' })
      img.setOptions({ removable: true })
      img.center()
      
      if (this.objBackground) this.canvas.remove(this.objBackground)
      this.canvas.add(img)
      this.canvas.renderAll()
    }, { crossOrigin: "Anonymous" })

    this.closeModal()
  }

  loadMore(iScroll) {
    setTimeout(() => {
      if (this.page < EditorBackgroundService.pages) {
        this.page++

        if (this.template.id_subdivision == null) {
          this.loadBackgrounds()
        } else {
          this.loadBackgroundsSubdvision()
        }
      }
      iScroll.target.complete()
    }, 3500)
  }

  loadErrorImg(event) {
    event.target.src = 'assets/img/erro-product.jpg'
  }

  closeModal() {
    this.modalController.dismiss()
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe())
  }
}
