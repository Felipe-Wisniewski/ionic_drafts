import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

import { Brand } from 'src/app/model/brand';

@Component({
  selector: 'app-filter-popover',
  templateUrl: './filter-popover.page.html',
  styleUrls: ['./filter-popover.page.scss'],
})
export class FilterPopoverPage implements OnInit {

  filters = null

  brands: Brand[]
  brandsFilter = null

  languages = [{ lang: 'inglês', id: '1' }, { lang: 'espanhol', id: '2' }, { lang: 'português', id: '3' }]
  languagesFilter = null

  layouts = {
    post: false,
    story: false
  }

  status = {
    ativo: false,
    inativo: false
  }

  constructor(private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnInit() {
    this.brands = this.navParams.get('brands')

    this.filters = this.navParams.get('filters')

    if (this.filters != null) {
      this.brandsFilter = this.filters.brandsFilter
      this.languagesFilter = this.filters.languagesFilter
      this.layouts = this.filters.layouts
      this.status = this.filters.status
    }
  }

  clean() {
    this.brandsFilter = null
    this.languagesFilter = null
    this.layouts.post = false
    this.layouts.story = false
    this.status.ativo = false
    this.status.inativo = false
  }

  filter() {
    this.popoverController.dismiss({
      brandsFilter: this.brandsFilter,
      languagesFilter: this.languagesFilter,
      layouts: this.layouts,
      status: this.status
    })
  }
}
