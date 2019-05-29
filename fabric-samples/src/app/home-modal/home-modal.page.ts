import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { testUserAgent } from '@ionic/core';

@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.page.html',
  styleUrls: ['./home-modal.page.scss'],
})
export class HomeModalPage implements OnInit {

  chooses: any

  constructor(private navParams: NavParams ,private modalController: ModalController) { }

  ngOnInit() {
    this.chooses = this.navParams.get('choose')
  }

  chooseSelected(choose) {
    this.modalController.dismiss({
      choose: choose
    })
  }

  closeModal() {
    this.modalController.dismiss()
  }

  loadErrorImg(event) {
    event.target.src = 'assets/img/placeholder.png';
  }
}
