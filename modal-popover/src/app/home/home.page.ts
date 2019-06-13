import { Component } from '@angular/core';
import { ModalController, ActionSheetController, PopoverController, NavController } from '@ionic/angular';

import { TextToolsPage } from './text-tools/text-tools.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title = 'Test'

  constructor(private nav: NavController,
    private modalController: ModalController, 
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController) {}

  share() {

  }

  openChangeProduct() {

  }

  async openOptionsAddItems() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Insert items',
      buttons: [
        {
          text: 'Brand logos',
          icon: 'photos',
          handler: () => {
            this.addItemsModal()
          }
        },
        {
          text: 'Your logo',
          icon: 'image',
          handler: () => {
            this.addItemsModal()
          }
        },
        {
          text: 'Stamps',
          icon: 'pricetags',
          handler: () => {
            this.addItemsModal()
          }
        },
        {
          text: 'Icons',
          icon: 'information',
          handler: () => {
            this.addItemsModal()
          }
        }
      ]
    });
    await actionSheet.present()
  }

  async addItemsModal() {
    const modal = await this.modalController.create({
      component: '',
      componentProps: {
        choose: 'choose'
      }
    })

    //retorno do component
    modal.onDidDismiss().then((it) => {
      if (it.data != null || it.data != undefined) {
        console.log(it.data['choose'])
        let image = it.data['choose'].image_url
      }
    })
    return await modal.present()
  }

  async openOptionsEditText(ev: Event) {
    const popover = await this.popoverController.create({
      component: TextToolsPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  deleteObjectOnCanvas() {

  }
}
