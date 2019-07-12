import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

import { TemplatesService } from './templates.service';
import { Template } from '../model/template';
import { Brand } from '../model/brand';
import { TemplatesPopoverPage } from './templates-popover/templates-popover.page';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {

  subscription$: Subscription[] = []
  templates: Template[] = []
  brands: Brand[] = []

  page = 1
  loaded = false

  constructor(
    private templatesService: TemplatesService, 
    private storage: Storage,
    private router: Router,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.getTemplates()
    this.getBrands()
  }

  getTemplates() {
    this.subscription$.push(this.templatesService.getTemplates(this.page)
      .subscribe((_templates) => {
        _templates.forEach(temp => {
          this.templates.push(temp)
        })
        this.loaded = true
      }))
  }

  getBrands() {
    this.subscription$.push(this.templatesService.getBrands()
      .subscribe((_brands) => {
        _brands.forEach(brand => {
          this.brands.push(brand)
        })
      }))
  }

  newTemplate() {
    this.templatePopover(null)
  }

  renameTemplate(template) {
    this.templatePopover(template)
  }

  async templatePopover(template) {
    const popover = await this.popoverController.create({
      component: TemplatesPopoverPage,
      animated: true,
      translucent: true,
      mode: "md",
      componentProps: {
        brands: this.brands,
        template: template
      }
    })
    return await popover.present()
  }

  editTemplate(template) {
    this.storage.set('template', template).then(() => {
      this.router.navigate(['editor-template'])
    })
  }

  deleteTemplate(template) {
    // TEMPLATE STATUS INATIVE
    console.log(template)
  }

  logout() {
    
  }

  loadMore(ev) {

  }

  loadErrorImg(ev) {

  }
}
