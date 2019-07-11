import { Template } from './../../model/template';
import { Brand } from './../../model/brand';
import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-templates-popover',
  templateUrl: './templates-popover.page.html',
  styleUrls: ['./templates-popover.page.scss'],
})
export class TemplatesPopoverPage implements OnInit {

  title = ''

  template: Template
  brands: Brand[] = []
  languages = [
    { lang: 'english', id: '1' }, 
    { lang: 'español', id: '2' }, 
    { lang: 'português', id: '3'}
  ]
  layouts = ['post', 'story']

  name = ''
  brand = ''
  language = ''
  layout = ''
  isNewTemplate = false

  constructor(private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnInit() {
    this.getParams().finally(() => {
      this.setParams()
    })
  }

  async getParams() {
    this.brands = await this.navParams.get('brands')
    this.template = await this.navParams.get('template')
  }

  setParams() {
    if (this.template == null) {
      this.title = 'New Template'
      this.isNewTemplate = true
    } else {
      this.title = 'Edit Template'
      this.name = this.template.name
      this.brand = this.getBrandTemplate()
      this.language = this.template.id_lang
    }
  }

  getBrandTemplate() {
    let brandName = ''
    this.brands.forEach(b => {
      if (b.id.toString() == this.template.id_brand)
        brandName = b.brand
    })
    return brandName
  }

  save() {
    console.log(this.name)
    console.log(this.brand)
    console.log(this.language)
    console.log(this.layout)
    this.closePopover()
  }

  closePopover() {
    this.popoverController.dismiss()
  }
}
