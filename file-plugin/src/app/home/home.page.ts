import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  returnAny: any

  constructor(private platform: Platform, private file: File) { }

  onClick() {
    if (this.platform.is('ios')) {
      console.log(this.platform.ready())
      console.log(this.file.applicationDirectory)
    }

    if (this.platform.is('android')) {

      if (this.platform.ready()) {
        this.file.checkDir(this.file.applicationDirectory, 'android')
      }
      console.log()
    }

    if (this.platform.is('desktop')) {
      console.log(this.platform.ready())
      console.log(this.file.applicationDirectory)
    }


    /*     this.file.checkDir(this.file.dataDirectory, 'Documents').then((it) => {
          console.log('Directory exists', it)
        }).catch(err => {
          console.log('Directory doesnt exist', err)
        }) */
  }
}
