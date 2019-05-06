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
  imagesSelected: GridImg[] = [];
  maxSelect: number = 2;
  isSelected: boolean = false;
  teste: any;

  constructor(public navCtrl: NavController) {
    for(let i = 0; i < 30; i++) {
      this.images.push(new GridImg(i, 'assets/placeholder.png'));
    }
  }

  ngOnInit() {
  }

  selectImg(image) {

    if (this.maxSelect <= this.imagesSelected.length) {
      // this.isSelected = !this.isSelected;
      for (let i = 0; i < this.imagesSelected.length; i++) {
        if (this.imagesSelected[i].id == image.id) {
          this.imagesSelected.splice(i, 1);
          console.log(`idx ${i}`);
          console.log(this.imagesSelected[i]);
          console.log(image);
        }
      }
    } else {
      this.imagesSelected.push(image);
    }
    console.log(this.imagesSelected);
  }

  checkPlatform() {
    console.log(this.imagesSelected);
  }
}
