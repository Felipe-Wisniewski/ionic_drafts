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

  constructor(public navCtrl: NavController) {
    for(let i = 0; i < 30; i++) {
      this.images.push(new GridImg(i, 'assets/placeholder.png'));
    }
  }

  selectImg(image) {
    console.log(this.currentSelected(image));
    let count = 0;
    for (let i = 0; i < this.imagesSelected.length; i++) {
      if (image.id == this.imagesSelected[i].id) {
        count++;
      }
    }
    
    if (this.imagesSelected.length < this.maxSelect && count == 0) {
      this.imagesSelected.push(image);

    } else {
      for (let i = 0; i < this.imagesSelected.length; i++) {
        if (this.imagesSelected[i].id == image.id && this.imagesSelected.length != 1) {
          this.imagesSelected.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.imagesSelected.length);
  }

  currentSelected(image) {
    return this.imagesSelected.filter(img => 
      img.id === image.id);
  }
  
  checkPlatform() {
    console.log(this.imagesSelected.toString);
  }
}
