import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Brand, Subdivision } from './../../model/brand';
import { Template } from './../../model/template';
import { TemplatesService } from '../templates.service';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/shared/language.service';

@Component({
  selector: 'app-templates-popover',
  templateUrl: './templates-popover.page.html',
  styleUrls: ['./templates-popover.page.scss'],
})
export class TemplatesPopoverPage implements OnInit {

  title = ''
  languages = null

  template: Template
  brands: Brand[] = []
  brand: Brand = null
  subs: Subdivision[] = []
  subdivision: Subdivision = null

  name = null
  language = null
  layout = null
  id_subdivision = null
  maxProducts = null
  validityStart?: string = null
  validityEnd?: string = null

  isNewTemplate = false
  isSubdivision = false
  isPost: boolean = false
  isStory: boolean = false
  isOne: boolean = false
  isTwo: boolean = false
  validityDate = false

  subscription$: Subscription[] = []

  constructor(
    private navParams: NavParams,
    private lang: LanguageService,
    private storage: Storage,
    private router: Router,
    private templateService: TemplatesService,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.getParams().finally(() => {
      this.setParams()
    })
  }

  async getParams() {
    this.brands = await this.navParams.get('brands')
    this.template = await this.navParams.get('templateEditor')
    this.languages = await this.lang.getLanguages()
  }

  setParams() {
    if (this.template == null) {
      this.title = 'Novo Template'
      this.isNewTemplate = true

    } else {
      this.title = 'Editar Template'
      this.name = this.template.name
      this.maxProducts = this.template.max_products
      this.getBrandTemplateEdit()
      this.getLanguageTemplateEdit()
      this.getTemplate()
    }
  }

  getBrandTemplateEdit() {
    this.brands.forEach(b => {
      if (b.id.toString() == this.template.id_brand) this.brand = b
    })
  }

  getLanguageTemplateEdit() {
    this.languages.forEach(lang => {
      if (lang.id == this.template.id_lang) this.language = lang
    })
  }

  getTemplate() {
    this.subscription$.push(this.templateService.getTemplate(this.template.id_template)
      .subscribe(temp => this.template = temp))
  }

  setBrandChange() {
    if (this.brand.id_highlight != null) {
      this.subs = this.brand.subdivisions
      this.isSubdivision = true
    } else {
      this.isSubdivision = false
    }
  }

  setLayoutPost(value) {
    if (!this.isPost) {
      this.layout = value
      this.isStory = false
    } else {
      this.layout = null
    }
  }

  setLayoutStory(value) {
    if (!this.isStory) {
      this.layout = value
      this.isPost = false
    } else {
      this.layout = null
    }
  }

  setNumberOne(value) {
    if (!this.isOne) {
      this.maxProducts = value
      this.isTwo = false
    } else {
      this.maxProducts = null
    }
  }

  setNumberTwo(value) {
    if (!this.isTwo) {
      this.maxProducts = value
      this.isOne = false
    } else {
      this.maxProducts = null
    }
  }

  save() {
    if (this.validForm()) {

      if (this.isNewTemplate) {
        this.template = {
          id_brand: this.brand.id.toString(),
          id_subdivision: this.id_subdivision,
          id_lang: this.language.id,
          name: this.name,
          thumbnail: null,
          layout: this.layout,
          max_products: this.maxProducts,
          json: null,
          validity_period_start: this.validityStart.slice(0, 10),
          validity_period_end: this.validityEnd.slice(0, 10),

          status: null,
          registration_user: null,
          registration_date: null,
          alteration_user: null,
          alteration_date: null,
          id_template: null,
          thumbnail_url: null
        }
        this.openEditor()
        this.closePopover()

      } else {
        this.template.name = this.name
        if (this.name != this.template.json.name) this.template.json.name = this.name
        this.template.id_brand = this.brand.id.toString()
        this.template.id_lang = this.language.id
        this.template.max_products = this.maxProducts

        if (this.validityDate) {
          this.template.validity_period_start = this.validityStart.slice(0, 10)
          this.template.validity_period_end = this.validityEnd.slice(0, 10)
        } else {
          this.template.validity_period_start = null
          this.template.validity_period_end = null
        }

        this.saveEditTemplate()
        this.closePopover()
      }

    } else {
      this.templateService.alertPopup('Preencha todos os campos para continuar.')
    }
  }

  saveEditTemplate() {
    this.subscription$.push(this.templateService.putTemplate(this.template)
      .subscribe(r => console.log(r)))
  }

  validForm() {
    let valid = 0

    if (this.name == null || this.name == '') valid++
    if (this.brand == null) valid++
    if (this.language == null) valid++
    if (this.maxProducts == null) valid++

    if (this.isSubdivision)
      this.subdivision == null ? valid++ : this.id_subdivision = this.subdivision.id_subdivision.toString()

    if (this.isNewTemplate)
      if (this.layout == null) valid++


    if (this.validityDate) {
      if (this.validityStart == null) valid++
      if (this.validityEnd == null) valid++
    }

    return valid == 0
  }

  openEditor() {
    this.storage.set('brand', this.brand)
    this.storage.set('template-editor', this.template).then(() => {
      this.router.navigate(['editor-template'])
    })
  }

  closePopover() {
    this.popoverController.dismiss()
  }
}