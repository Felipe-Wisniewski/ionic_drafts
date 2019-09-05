import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/File/ngx';
import { Platform, ActionSheetController } from '@ionic/angular';
import { Camera, PictureSourceType, CameraOptions } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  canvas: Canvas
  urlImage = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/6283-3039-5881-29452.jpg'

  constructor(
    private file: File,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private plt: Platform) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.createCanvas()
      this.imageToCanvas()
    })
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    this.camera.getPicture(options).then(imagePath => {

      if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {

        /* this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1)
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'))
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName())
          }) */

      } else {
        console.log('imagePath', imagePath)
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1)
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1)
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName())
      }
    })
  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg"
    return newFileName
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {

    console.log('namePath', namePath)
    console.log('currentName', currentName)
    console.log('newFileName', newFileName)

    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      // this.updateStoredImages(newFileName);
      console.log('copyFile', success)

      this.readFile(success, (callback) => {
        // base64 = callback.target.result
        console.log('callback', callback)
      })

    }, error => {
      // this.presentToast('Error while storing file.');
      console.error(error)
    })
  }

  readFile(file, callback) {
    console.log('readFile', file)

    file.file((f) => {
      let reader = new FileReader()
      reader.onload = callback
      reader.readAsDataURL(f)

    }, (err) => {
      console.error(err)
    })
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
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
  }

  imageToCanvas() {
    let imgUrl = this.urlImage.replace(/^https:\/\//i, 'http://')

    fabric.Image.fromURL(imgUrl, (img) => {
      img.scaleToHeight(this.canvas.getHeight())
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas))
    }, { crossOrigin: 'Anonymous' })
  }
}
