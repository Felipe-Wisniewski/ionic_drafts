import { Component, OnInit, OnDestroy } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';

import { EditorService } from './editor.service';
import { Brand } from '../model/brand';
import { Template } from '../model/template';
import { Post } from '../model/post';
import { Product } from '../model/product';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit, OnDestroy {

  canvas: Canvas
  layout = ''
  title = ''
  brand: Brand
  template: Template
  post: Post
  products: Product[] = []

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas')
    this.getSelectedChoices().then(() => {
      this.loadCanvasDimensions()
    })
  }

  async getSelectedChoices() {
    await this.editorService.getBrandStorage()
      .then((brand) => {
        this.brand = brand
        this.title = this.brand.brand
      })
      .catch((err) => {
        console.log('getBrand error', err)
      })

    await this.editorService.getTemplateStorage()
      .then((template) => {
        this.template = template
        this.layout = this.template.layout
      })
      .catch(() => {
        this.template = null
      })

    await this.editorService.getPostStorage()
      .then((post) => {
        this.post = post
        this.layout = this.post.layout
      })
      .catch(() => {
        this.post = null
      })

    await this.editorService.getProductsStorage()
      .then((products) => {
        products.forEach(p => {
          this.products.push(p)
        })
      })
      .catch((err) => {
        console.log('getProduct', err)
      })
  }

  loadCanvasDimensions() {
    this.editorService.setCanvasDimensions(this.canvas, this.layout).then(() => {
      console.log('canvas dimensions ok')
      this.template != null ? this.loadTemplate() : this.loadPost()
    })
  }

  loadTemplate() {
    this.editorService.setTemplateOnCanvas(this.canvas, this.template.json).then((it) => {
      console.log('template ok!', it)
      this.loadProducts()
    })
  }

  loadProducts() {
    this.editorService.setProductsOnCanvas(this.canvas, this.products).then((it) => {
      console.log('products ok!', it)
      this.canvas.forEachObject((it, i) => {
        console.log(i)
        console.log(it)
      })
    })
  }

  loadPost() {
    this.editorService.setPostOnCanvas(this.canvas, this.post.post_url, this.brand.logo_url).then(() => {
      console.log('posts ok!')
      this.canvas.forEachObject((it, i) => {
        console.log(i)
        console.log(it)
      })
    })
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
