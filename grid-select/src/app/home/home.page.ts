import { Component } from '@angular/core';
import { GridImg } from './gridimg';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  images: GridImg[] = [];
  isSelected: boolean = false;

  constructor(public navCtrl: NavController) {
    for(let i = 0; i < 30; i++) {
      this.images.push(new GridImg('assets/placeholder.png'));
    }
  }

  ngOnInit() {
  }

  selectImg(image) {
    console.log(image);
    this.isSelected = !this.isSelected;
  }

  checkPlatform() {
    
  }
}
