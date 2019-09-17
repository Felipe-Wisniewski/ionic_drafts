import { Component } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-web-share',
  templateUrl: './web-share.page.html',
  styleUrls: ['./web-share.page.scss'],
})
export class WebSharePage {

  base64 = null
  blob = null

  constructor(private navParams: NavParams, private popoverController: PopoverController) {
    this.base64 = this.navParams.get('base64')
    this.blob = this.navParams.get('blob')
  }

  closePopover() {
    this.popoverController.dismiss()
  }
}
