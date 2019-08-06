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
import { TemplatesService } from '../templates/templates.service';
import { EditorBackgroundPage } from './editor-background/editor-background.page';
import { EditorStampsPage } from './editor-stamps/editor-stamps.page';
import { EditorStampsPopoverPage } from './editor-stamps-popover/editor-stamps-popover.page';
import { EditorIconsPopoverPage } from './editor-icons-popover/editor-icons-popover.page';
import { EditorIconsModalPage } from './editor-icons-modal/editor-icons-modal.page';
import { EditorBackgroundPopoverPage } from './editor-background-popover/editor-background-popover.page';
import { EditorTextPopoverPage } from './editor-text-popover/editor-text-popover.page';

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
  objectSelected: any

  subscription$: Subscription[] = []

  constructor(
    private storage: Storage,
    private templateService: TemplatesService,
    private modalController: ModalController,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.getChoices().then(() => {
      if (this.template.id_template != null) this.getTemplate()
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
    this.getCanvasEvents()
  }

  getCanvasEvents() {
    this.canvas.on({
      'selection:created': (obj) => {
        this.objectSelected = obj.target
      },
      'selection:updated': (obj) => {
        this.objectSelected = obj.target
      },
      'selection:cleared': () => {
        this.objectSelected = null
      }
    })
  }

  getTemplate() {
    this.subscription$.push(this.templateService.getTemplate(this.template.id_template)
      .subscribe((_template) => {
        this.template = _template
        this.setTemplateOnCanvas()
      }))
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
    })
    return await this.canvas.loadFromJSON(this.template.json, this.canvas.renderAll.bind(this.canvas))
  }

  async addText(ev) {
    const popover = await this.popoverController.create({
      component: EditorTextPopoverPage,
      event: ev,
      animated: true,
      translucent: true,
      mode: "md",
      componentProps: {
        canvas: this.canvas,
        object: this.objectSelected
      }
    })
    return await popover.present()
  }

  async addStamps(ev) {
    if (this.objectSelected != null && this.objectSelected.controls == 'stamps') {
      const popover = await this.popoverController.create({
        component: EditorStampsPopoverPage,
        event: ev,
        animated: true,
        translucent: true,
        mode: "md",
        componentProps: {
          canvas: this.canvas,
          object: this.objectSelected
        }
      })
      return await popover.present()

    } else {
      const modal = await this.modalController.create({
        component: EditorStampsPage,
        componentProps: {
          canvas: this.canvas,
          template: this.template
        }
      })
      return await modal.present()
    }
  }

  async addBackground(ev) {
    let objBackground = null

    this.canvas.forEachObject((obj: any) => {
      if (obj.controls === 'background') objBackground = obj
    })

    if (objBackground) {
      const popover = await this.popoverController.create({
        component: EditorBackgroundPopoverPage,
        event: ev,
        animated: true,
        translucent: true,
        mode: "md",
        componentProps: {
          canvas: this.canvas,
          template: this.template,
          objBackground: objBackground
        }
      })
      return await popover.present()

    } else {
      const modal = await this.modalController.create({
        component: EditorBackgroundPage,
        componentProps: {
          canvas: this.canvas,
          template: this.template
        }
      })
      return await modal.present()
    }
  }

  async addIcons(ev) {
    if (this.objectSelected != null && this.objectSelected.controls == 'icons') {
      const popover = await this.popoverController.create({
        component: EditorIconsPopoverPage,
        event: ev,
        animated: true,
        translucent: true,
        mode: "md",
        componentProps: {
          canvas: this.canvas,
          object: this.objectSelected
        }
      })
      return await popover.present()

    } else {
      const modal = await this.modalController.create({
        component: EditorIconsModalPage,
        componentProps: {
          canvas: this.canvas,
          template: this.template
        }
      })
      return await modal.present()
    }
  }

  saveTemplate() {
    this.template.json = JSON.stringify(this.canvas)
    this.template.thumbnail = this.canvas.toDataURL({ format: 'png', quality: 0.3 })

    if (this.template.id_template != null) {
      this.subscription$.push(this.templateService.putTemplate(this.template)
        .subscribe((r) => {
          console.log(r)
        }))

    } else {
      this.subscription$.push(this.templateService.saveTemplate(this.template)
        .subscribe((r) => {
          console.log(r)
        }))
    }
  }

  deleteObjectOnCanvas() {
    this.canvas.remove(this.objectSelected)
  }
}