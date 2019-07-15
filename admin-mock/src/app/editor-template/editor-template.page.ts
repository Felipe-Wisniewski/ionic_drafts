import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

import { Template } from '../model/template';
import { Brand } from '../model/brand';
import { Stamp } from '../model/stamp';
import { Icon } from '../model/icon';
import { EditorTemplateService } from './editor-template.service';
import { EditorBackgroundPage } from './editor-background/editor-background.page';

@Component({
  selector: 'app-editor-template',
  templateUrl: './editor-template.page.html',
  styleUrls: ['./editor-template.page.scss'],
})
export class EditorTemplatePage implements OnInit {

  title = ''
  canvas: Canvas
  layout = ''

  template: Template
  brand: Brand
  
  stamps: Stamp[] = []
  icons: Icon[] = []

  subscription$: Subscription[] = []

  constructor(
    private storage: Storage,
    private editorTemplateService: EditorTemplateService,
    private modalController: ModalController,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.getChoices().then(() => {
      if (this.template.id_template != null) this.getTemplate()
      this.getStamps()
      this.getIcons()
    })
  }

  async getChoices() {
    await this.storage.get('template-editor').then((temp) => {
      this.template = temp
      this.layout = this.template.layout
    }).finally(() => {
      this.createCanvas()
    })
  }

  createCanvas() {
    this.canvas = new fabric.Canvas('canvas')
    this.canvas.backgroundColor = '#FFFFFF'
    this.canvas.preserveObjectStacking = true
    let header = 56
    let footer = 56
    let widthScreen = parent.innerWidth
    let heightScreen = parent.innerHeight - (header + footer)

    if (this.layout == 'post') {
      if (widthScreen > heightScreen) {
        this.canvas.setDimensions({ width: heightScreen, height: heightScreen })
      } else {
        this.canvas.setDimensions({ width: widthScreen, height: widthScreen })
      }
    }

    if (this.layout == 'story') {
      let width = (1080 / 1920) * heightScreen
      this.canvas.setDimensions({ width: width, height: heightScreen })
    }
    console.log('canvas ok')
  }

  getTemplate() {
    this.subscription$.push(this.editorTemplateService.getTemplate(this.template.id_template)
      .subscribe((_template) => {
        this.template = _template
        this.setTemplateOnCanvas()
      }))
  }

  getStamps() {
    /* this.subscription$.push(this.editorTemplateService.getStamps(this.template.id_template)
      .subscribe((_stamps) => {
        this.stamps = _stamps
      })) */
  }

  getIcons() {
    /* this.subscription$.push(this.editorTemplateService.getIcons(this.template.id_template)
      .subscribe((_icons) => {
        this.icons = _icons
      })) */
  }

  async setTemplateOnCanvas() {
    this.template.json.objects.forEach((obj) => {

      obj.scaleX = (obj.scaleX / 100) * this.canvas.getWidth()
      obj.scaleY = (obj.scaleY / 100) * this.canvas.getHeight()
      obj.top = (obj.top / 100) * this.canvas.getHeight()
      obj.left = (obj.left / 100) * this.canvas.getWidth()
      obj.lastGoodLeft = obj.left
      obj.lastGoodTop = obj.top

      if (!obj.selectable) obj.evented = false

      if (obj.type == 'text') {
        // this.controls.text = true
        // this.textTemplate = obj.text
        // TODO
        // let font = new FontFaceObserver(obj.fontFamily)
        // fonts.push(font.load().catch(() => obj.fontFamily = 'Roboto'))
      }
    })
    return await this.canvas.loadFromJSON(this.template.json, this.canvas.renderAll.bind(this.canvas))
  }

  addText() {

  }

  addStamps() {

  }

  async addBackground() {
    const modal = await this.modalController.create({
      component: EditorBackgroundPage,
      componentProps: {
        canvas: this.canvas,
        template: this.template
      }
    })
    modal.onDidDismiss().then(() => {
      console.log('modal.onDidDismiss')
    })
    return await modal.present()
  }

  addIcons() {

  }

  editorSet() {

  }
}
