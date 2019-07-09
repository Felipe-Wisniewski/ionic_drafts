import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  imgSrc = 'https://s3-sa-east-1.amazonaws.com/bancoimagens.com.br/posts/8246-355-11079-29452.jpg'

  constructor() { }

  share() {
    console.log(this.imgSrc)
  }
}
