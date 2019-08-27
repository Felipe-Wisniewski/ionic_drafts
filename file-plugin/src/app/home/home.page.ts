import { FileService } from './../shared/file.service';
import { Component, OnInit, Input } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { UtilsService } from '../shared/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  canvas: Canvas
  fileLogo = null
  fileBase64 = null

  constructor(
    private platform: Platform,
    private fileService: FileService,
    private util: UtilsService) { }

  ngOnInit() {
    this.createCanvas()
  }

  putImage() {
    this.fileBase64 = this.canvas.toDataURL({ format: 'png', multiplier: 2 })
    let fileName = `${Math.floor(Math.random() * 1000) + 1}.jpeg`

    this.platform.ready().then(() => {

      this.fileService.base64toBlob(this.fileBase64).then((blob) => {

        this.fileService.checkDirectory('Beira Rio').then(() => {

          this.fileService.writeFile(fileName, blob)
            .then(() => { this.util.alertToast('Imagem salva com sucesso !') })
            .catch(() => { this.util.alertToast('Ocorreu um erro ao salvar no aparelho.') })

        }).catch((err) => {
          this.fileService.createDirectory('Beira Rio').then(() => {

            this.fileService.writeFile(fileName, blob)
              .then(() => { this.util.alertToast('Imagem salva com sucesso !') })
              .catch(() => { this.util.alertToast('Ocorreu um erro ao salvar no aparelho.') })

          }).catch(() => {
            this.util.alertToast('Ocorreu um erro ao salvar no aparelho.')
          })
        })
      })
    })
  }

  inputLogo(event) {
    this.fileService.readFile(event.target.files[0]).then((fileInput) => {
      console.log(fileInput)
    }).catch((err) => {
      console.log(err)
    })
  }

  getLogo() {
    
  }

  listDir() {
    this.fileService.listDirectories()
  }

  createCanvas() {
    this.canvas = new fabric.Canvas('canvas')
    this.canvas.backgroundColor = '#FFFFFF'
    let widthScreen = parent.innerWidth
    let height = (545 / 800) * widthScreen
    this.canvas.setDimensions({ width: widthScreen, height: height })

    this.canvas.on({
      'touch:gesture': (obj) => {
        console.log(obj)
      }
    })

    let url = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/6283-3039-5881-29452.jpg'
    let imgUrl = url.replace(/^https:\/\//i, 'http://')

    fabric.Image.fromURL(imgUrl, (img) => {
      img.scaleToHeight(this.canvas.getHeight())
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas))
    }, { crossOrigin: 'Anonymous' })
  }
}