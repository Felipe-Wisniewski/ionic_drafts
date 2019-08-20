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

  readFile(file: any) {
    const reader = new FileReader()
    reader.onloadend = () => {
      const formData = new FormData()
      const imgBlob = new Blob([reader.result], {
        type: file.type
      })
      formData.append('file', imgBlob, file.name)
      // this.uploadImageData(formData);
      console.log(formData)
    }
    reader.readAsArrayBuffer(file)
  }

  /*
    if (this.platform.is('android')) {
 
      if (this.platform.ready()) {
        this.file.checkDir(this.file.applicationDirectory, 'android')
      }
      console.log()
    }
            this.file.checkDir(this.file.dataDirectory, 'Documents').then((it) => {
          console.log('Directory exists', it)
        }).catch(err => {
          console.log('Directory doesnt exist', err)
        }) 
        */
}
