import { Brand } from './../model/brand';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';

import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit, OnDestroy {

  canvas: Canvas

  title = ''
  logo = ''
  layout = ''
  template: any
  post: any
  product_one: any
  product_two: any

  constructor(private storage: Storage, private editorService: EditorService) { }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas')
    this.getChoose()
  }

  getChoose() {
    this.storage.get('brand').then((_brand) => {
      if (_brand.brand != null || _brand.brand != undefined) {
        this.title = _brand.brand
      } else {
        this.title = _brand.subdivision
      }
      this.logo = _brand.logo_url
    })

    this.storage.get('template').then((_template) => {
      if (_template != null || _template != undefined) {
        this.layout = _template.layout
        this.template = _template
        this.setCanvasDimensions()
        this.setTemplateOnCanvas()
      }
    })

    this.storage.get('post').then((_post) => {
      if (_post != null || _post != undefined) {
        this.layout = _post.layout
        console.log(_post)
        this.post = _post.post_url
        this.setCanvasDimensions()
        this.setPostOnCanvas()
      }
    })

    this.storage.get('products').then((_products) => {
      if (_products != null || _products != undefined) {
        if (_products.size > 1) {
          this.product_one = _products[0]
          this.product_two = _products[1]
        } else {
          this.product_one = _products[0]
        }

      }
    })
  }

  setCanvasDimensions() {
    this.editorService.setCanvasDimensions(this.canvas, this.layout)
  }

  setTemplateOnCanvas() {
    this.editorService.setTemplateOnCanvas(this.canvas, this.template.json)
  }

  setPostOnCanvas() {
    this.editorService.setPostOnCanvas(this.canvas, this.post, this.logo)
  }

  setImageOnCanvas() {
    
  }

  share() {

  }

  openChangeProduct() {

  }

  openOptionsAddItems() {

  }

  openOptionsEditText() {

  }

  deleteObjectOnCanvas() {

  }

  ngOnDestroy() {
  }
}
