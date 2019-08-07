import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

import { TemplatesService } from './templates.service';
import { Template } from '../model/template';
import { Brand } from '../model/brand';
import { TemplatesPopoverPage } from './templates-popover/templates-popover.page';
import { FilterPopoverPage } from './filter-popover/filter-popover.page';

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
  filters = null
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
    this.subscription$.push(this.templatesService.getTemplates(this.filters, this.page)
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

  async addFilters() {
    const popover = await this.popoverController.create({
      component: FilterPopoverPage,
      animated: true,
      translucent: true,
      mode: "md",
      componentProps: {
        brands: this.brands,
        filters: this.filters
      }
    })

    popover.onDidDismiss().then((filters) => {
      this.filters = filters.data
      this.page = 1
      this.loaded = false
      this.templates = []
      this.getTemplates()
    })
    return await popover.present()
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
        templateEditor: template
      }
    })
    return await popover.present()
  }

  editTemplate(template) {
    this.storage.set('template-editor', template).then(() => {
      this.router.navigate(['editor-template'])
    })
  }

  disableTemplate(template) {
    this.templatesService.disableTemplate(template)
      .subscribe((r) => console.log(r))
  }

  enableTemplate(template) {
    this.templatesService.putTemplate(template)
      .subscribe((r) => console.log(r))
  }

  loadMore(event) {
    setTimeout(() => {
      if (this.page < TemplatesService.pages) {
        this.page++
        this.getTemplates()
      }

      event.target.complete()
    }, 3500)
  }

  loadErrorImg(event) {
    event.target.src = 'assets/img/erro-template.jpg'
  }

  ngOnDestroy() {
    this.subscription$.forEach((s) => s.unsubscribe())
  }
}