import { Brand } from './../model/brand';
import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-templates-posts-popover',
  templateUrl: './templates-posts-popover.page.html',
  styleUrls: ['./templates-posts-popover.page.scss'],
})
export class TemplatesPostsPopoverPage implements OnInit {

  brand: Brand
  logoUrl = ''

  constructor(private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnInit() {
    this.brand = this.navParams.get('brand')
    this.logoUrl = this.brand.logo_url
  }

  closePopover() {
    this.popoverController.dismiss()
  }
}
