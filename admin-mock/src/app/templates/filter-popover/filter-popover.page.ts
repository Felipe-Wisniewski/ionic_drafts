import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

import { Brand } from 'src/app/model/brand';

@Component({
  selector: 'app-filter-popover',
  templateUrl: './filter-popover.page.html',
  styleUrls: ['./filter-popover.page.scss'],
})
export class FilterPopoverPage implements OnInit {

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
