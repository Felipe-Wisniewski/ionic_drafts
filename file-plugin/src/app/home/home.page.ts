import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { UtilsService } from '../shared/utils';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  canvas: Canvas
  fileBase64 = null

  constructor(private platform: Platform, private file: File, private utilsService: UtilsService) { }

  ngOnInit() {
    this.createCanvas()
  }

  putImage() {
    this.platform.ready().then(() => { this.writeFile() })
  }

  writeFile() {
    let dataBlock = this.fileBase64.split(";")
    let contentType = dataBlock[0].split(":")[1]
    let base64 = dataBlock[1].split(",")[1]
    let fileBlob = this.utilsService.base64toBlob(base64, contentType, 512)

    let fileName = `${Math.floor(Math.random() * 1000) + 1}.jpeg`

    this.file.checkDir(this.file.externalRootDirectory, 'Beira Rio').then(
      () => {
        this.file.writeFile(`${this.file.externalRootDirectory}Beira Rio`, fileName, fileBlob, { replace: false }).then((ok) => {
          console.log('isD arquivo criado', ok)
        },
          (err) => { console.log('isD arquivo existe', err) })

      }).catch(
        () => {
          this.file.createDir(this.file.externalRootDirectory, 'Beira Rio', false).then(
            () => {
              console.log('name', fileName)
              console.log(this.fileBase64)

              this.file.writeFile(`${this.file.externalRootDirectory}Beira Rio`, fileName, fileBlob, { replace: true }).then(
                (ok) => { console.log('!isD arquivo criado', ok) },
                (err) => { console.log('!isD arquivo existe', err) })

            },
            (err) => { console.log('erro criar diretorio', err) })
        })
  }

  getLogo() {
    this.platform.ready().then((it) => {
      console.log(it)
      this.readFile()
    })
  }

  readFile() {

  }

  createCanvas() {
    let url = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/6283-3039-5881-29452.jpg'
    let imgUrl = url.replace(/^https:\/\//i, 'http://')

    this.canvas = new fabric.Canvas('canvas')
    this.canvas.backgroundColor = '#FFFFFF'

    let header = 56
    let footer = 56
    let heightScreen = parent.innerHeight - (header + footer)
    let width = (800 / 545) * heightScreen
    this.canvas.setDimensions({ width: width, height: heightScreen })

    this.canvas.on({
      'touch:gesture': (obj) => {
        console.log(obj)
      }
    })

    fabric.Image.fromURL(imgUrl, (img) => {
      img.scaleToHeight(this.canvas.getHeight())
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas))
    }, { crossOrigin: 'Anonymous' })

    this.fileBase64 = this.canvas.toDataURL({ format: 'jpeg', quality: 1 })
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