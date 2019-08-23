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
    console.log(this.platform.ready())
    console.log(this.platform.is('android'))
    console.log(this.file.applicationDirectory)
    console.log(this.file.applicationStorageDirectory)
    console.log(this.file.cacheDirectory)
    // console.log(this.file.)
    

    this.file.resolveLocalFilesystemUrl(this.file.applicationStorageDirectory).then((d) => {
      d.getParent((ds) => {
        ds.getFile(this.file.applicationStorageDirectory, { create: true }, (it) => {
          console.log(it)
          
        })
      })
    }).catch((err) => {
      console.log('err', err)
    })
  }
}
