import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, PopoverController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Brand, Subdivision } from './../../model/brand';
import { Template } from './../../model/template';
import { TemplatesService } from '../templates.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-templates-popover',
  templateUrl: './templates-popover.page.html',
  styleUrls: ['./templates-popover.page.scss'],
})
export class TemplatesPopoverPage implements OnInit {

  title = ''

  template: Template
  brands: Brand[] = []
  brand: Brand = null
  subs: Subdivision[] = []
  subdivision: Subdivision = null

  languages = [{ lang: 'inglês', id: '1' }, { lang: 'espanhol', id: '2' }, { lang: 'português', id: '3' }]

  layouts = ['post', 'story']

  name = null
  language = null
  layout = null
  id_subdivision = null
  maxProducts = "1"
  validityDate = false
  validityStart = null
  validityEnd = null

  isNewTemplate = false
  isSubdivision = false

  subscription$: Subscription[] = []

  constructor(
    private navParams: NavParams,
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

  save() {
    if (this.validForm()) {

      if (this.isNewTemplate) {

        this.template = {
          id_brand: this.brand.id.toString(),
          id_subdivision: this.id_subdivision,
          max_products: this.maxProducts,
          status: null,
          registration_user: null,
          registration_date: null,
          alteration_user: null,
          alteration_date: null,
          id_lang: this.language.id,
          id_template: null,
          layout: this.layout,
          json: null,
          name: this.name,
          thumbnail_url: null,
          thumbnail: null,
          validity_period_start: this.validityStart,
          validity_period_end: this.validityEnd
        }

        this.openEditor()
        this.closePopover()

      } else {
        this.template.name = this.name
        this.template.id_brand = this.brand.id.toString()
        this.template.id_lang = this.language.id // TODO ID_LANG !
        this.template.max_products = this.maxProducts

        if (this.validityDate) {
          this.template.validity_period_start = this.validityStart
          this.template.validity_period_end = this.validityEnd
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
    console.log('save edit')
    this.subscription$.push(this.templateService.putTemplate(this.template)
      .subscribe(r => console.log(r)))
  }

  validForm() {
    let valid = 0

    if (this.name == null || this.name == '') valid++
    if (this.brand == null) valid++
    if (this.language == null) valid++

    if (this.isSubdivision) {
      if (this.subdivision == null) {
        valid++
      } else {
        this.id_subdivision = this.subdivision.id_subdivision.toString()
      }
    }

    if (this.isNewTemplate) {
      if (this.layout == null) valid++
    }

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