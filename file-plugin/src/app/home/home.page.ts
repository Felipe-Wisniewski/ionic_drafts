import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  canvas: Canvas
  fileBase64 = null

  constructor(private platform: Platform, private file: File) { }

  ngOnInit() {
    this.getFileBase64().then((img) => {
      this.fileBase64 = this.base64toBlob(img, 'image/jpeg')
    })
  }

  putImage() {
    this.platform.ready().then(() => { this.writeFile() })
  }

  writeFile() {
    let fileName = `${Math.floor(Math.random() * 1000) + 1}.jpeg`

    this.file.checkDir(this.file.externalRootDirectory, 'BeiraRio').then(() => {

      this.file.writeFile(`${this.file.externalRootDirectory}BeiraRio`, fileName, this.fileBase64, { replace: false }).then((ok) => {
        console.log('isD arquivo criado', ok)
      }, (err) => { console.log('isD arquivo existe', err) })

    }).catch(() => {

      this.file.createDir(this.file.externalRootDirectory, 'BeiraRio', false).then(() => {
        console.log('name', fileName)
        console.log(this.fileBase64)
        this.file.writeFile(`${this.file.externalRootDirectory}BeiraRio`, fileName, this.fileBase64, { replace: true }).then((ok) => {
          console.log('!isD arquivo criado', ok)
        }, (err) => { console.log('!isD arquivo existe', err) })
      }, (err) => { console.log('erro criar diretorio', err) })
    })
  }

  async getFileBase64() {
    let url = 'https://statig0.akamaized.net/bancodeimagens/92/9r/06/929r06k6yv535ne5nfdzdspr3.jpg'
    let imgUrl = url.replace(/^https:\/\//i, 'http://')

    this.canvas = new fabric.Canvas('canvas')
    this.canvas.backgroundColor = '#FFFFFF'
    this.canvas.setDimensions({ width: 300, height: 200 })
    this.canvas.on({
      'touch:gesture': (obj) => {
        console.log(obj)
      }
    })

    await fabric.Image.fromURL(imgUrl, (img) => {
      img.scaleToHeight(this.canvas.getHeight())
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas))
    }, { crossOrigin: 'Anonymous' })

    return await this.canvas.toDataURL({ format: 'jpeg', quality: 1 })
  }

  private base64toBlob(base64, type) {
    let sliceSize = 512
    
    let byteCharacters = atob(base64.split(',')[1])
    let byteArrays = []

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize)

      let byteNumbers = new Array(slice.length)

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      let byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: type })
  }

  getLogo() {
    this.platform.ready().then((it) => {
      console.log(it)
      this.readFile()
    })
  }

  readFile() {

  }
}
/* 
console.log(this.file.applicationDirectory) //file:///android_asset/
console.log(this.file.applicationStorageDirectory) //file:///data/user/0/io.ionic.starter/
console.log(this.file.cacheDirectory) //file:///data/user/0/io.ionic.starter/cache/
console.log(this.file.dataDirectory) //file:///data/user/0/io.ionic.starter/files/
console.log(this.file.documentsDirectory) //null
console.log(this.file.externalApplicationStorageDirectory) //file:///storage/emulated/0/Android/data/io.ionic.starter/
console.log(this.file.externalCacheDirectory) //file:///storage/emulated/0/Android/data/io.ionic.starter/cache/
console.log(this.file.externalDataDirectory) //file:///storage/emulated/0/Android/data/io.ionic.starter/files/
console.log(this.file.externalRootDirectory) //file:///storage/emulated/0/
console.log(this.file.sharedDirectory) //null
console.log(this.file.syncedDataDirectory) //null
console.log(this.file.tempDirectory) //null
 */