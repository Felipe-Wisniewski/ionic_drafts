import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AddItemsModalService } from './add-items-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-items-modal',
  templateUrl: './add-items-modal.page.html',
  styleUrls: ['./add-items-modal.page.scss'],
})
export class AddItemsModalPage implements OnInit {

  choose: string
  chooses = []

  subscription$: Subscription

  constructor(private navParams: NavParams, private modalService: AddItemsModalService, private modalController: ModalController) { }

  ngOnInit() {
    this.choose = this.navParams.get('choose')
    this.loadItemsEditor()
  }

  loadItemsEditor() {
    switch (this.choose) {
      case 'brand': {
        this.subscription$ = this.modalService.getBrandsLogos()
          .subscribe(brandLogos => {
            brandLogos.forEach(logo => this.chooses.push(logo))
          })
        break
      }
      case 'logo': {
        // this.homeService.getUserLogos()
        break
      }
      case 'stamps': {
        this.subscription$ = this.modalService.getStamps()
          .subscribe(stamps => {
            stamps.forEach(s => this.chooses.push(s))
          })
        break
      }
      case 'icons': {
        this.subscription$ = this.modalService.getIcons()
          .subscribe(icons => {
            icons.forEach(i => this.chooses.push(i))
          })
        break
      }
      default: {
        break
      }
    }
  }

  addItem(choose) {
    this.modalController.dismiss({
      choose: choose
    })
  }

  closeModal() {
    this.modalController.dismiss({ teste: 'closeModal' })
  }

  loadErrorImg(event) {
    event.target.src = 'assets/img/placeholder.png';
  }
}