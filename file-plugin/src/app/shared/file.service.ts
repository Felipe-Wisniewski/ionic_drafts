import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { UtilsService } from './utils.service';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private platform: Platform, private file: File, private utils: UtilsService) { }

  saveToDevice(blob, fileName) {

    this.platform.ready().then(() => {

      window.requestFileSystem(LocalFileSystem.PERSISTENT, (fileEntry) => {

        console.log(fileEntry)

        fileEntry.file((file) => {
          // _playNow(file.localURL);

        }, (error) => {
          console.log(error)
        })

      }, (error) => {
        console.log(error)
      })

      /* window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {

        console.log('file system open: ' + fs.name)

        fs.root.getFile(fs.root, { create: true, exclusive: false }, (fileEntry) => {

          console.log("fileEntry is file?" + fileEntry.isFile.toString())
          // fileEntry.name == 'someFile.txt'
          // fileEntry.fullPath == '/someFile.txt'
          // writeFile(fileEntry, null)

        }, (onErrorCreateFile) => {
          console.log(onErrorCreateFile)

        })

      }, (onErrorLoadFs) => {
        console.log(onErrorLoadFs)

      })*/
    })
  }

  createToDevice(dirEntry, blob, fileName) {

    dirEntry.getFile(fileName, { create: true, exclusive: false }, (fileEntry) => {

      fileEntry.createWriter((fileWriter) => {

        fileWriter.onwriteend = () => {
          console.log("Successful file write...")
          console.log(fileEntry)
        }

        fileWriter.onerror = (e) => { console.log("Failed file write: " + e.toString()) }

        fileWriter.write(blob)

      }, (onErrorCreateFile) => {
        console.log(onErrorCreateFile)

      })
    })
  }

  async checkDirectory(directoryName) {
    return await this.file.checkDir(this.getRootDirectory(), directoryName)
  }

  async createDirectory(directoryName) {
    return await this.file.createDir(this.getRootDirectory(), directoryName, false)
  }

  /* async writeFile(fileName, fileBlob) {
    return await this.file.writeFile(`${this.getRootDirectory()}BeiraRio`, fileName, fileBlob, { replace: true })
  } */

  async base64toBlob(fileBase64) {
    let dataBlock = fileBase64.split(";")
    let contentType = dataBlock[0].split(":")[1]
    let base64 = dataBlock[1].split(",")[1]

    const bytes = atob(base64)
    const byteNumbers = new Array(bytes.length)

    for (let i = 0; i < bytes.length; i++)
      byteNumbers[i] = bytes.charCodeAt(i)

    const byteArray = new Uint8Array(byteNumbers)

    const blob = await new Blob([byteArray], { type: contentType })

    return blob;
  }

  getRootDirectory() {
    if (this.platform.is("ios")) { return this.file.dataDirectory }
    if (this.platform.is("android")) return this.file.externalRootDirectory
    if (this.platform.is("desktop")) return ''
    return ''
  }

  listDirectories() {
    console.log(this.file.applicationDirectory) // file:///android_asset/
    console.log(this.file.applicationStorageDirectory) // file:///data/user/0/io.ionic.starter/
    console.log(this.file.cacheDirectory) // file:///data/user/0/io.ionic.starter/cache/
    console.log(this.file.dataDirectory) // file:///data/user/0/io.ionic.starter/files/
    console.log(this.file.documentsDirectory) // null
    console.log(this.file.externalApplicationStorageDirectory) // file:///storage/emulated/0/Android/data/io.ionic.starter/
    console.log(this.file.externalCacheDirectory) // file:///storage/emulated/0/Android/data/io.ionic.starter/cache/
    console.log(this.file.externalDataDirectory) // file:///storage/emulated/0/Android/data/io.ionic.starter/files/
    console.log(this.file.externalRootDirectory) // file:///storage/emulated/0/
    console.log(this.file.sharedDirectory) // null
    console.log(this.file.syncedDataDirectory) // null
    console.log(this.file.tempDirectory) // null

    // file:///var/containers/Bundle/Application/164D66D3-F3ED-44E8-9CE2-8675DCC3D3A6/MyApp.app/ (cordova.98fc7fcb7c020c1504f6.js, line 1)
    // file:///var/mobile/Containers/Data/Application/E35A82F5-EF4D-4F81-8767-59C4A054E213/ (cordova.98fc7fcb7c020c1504f6.js, line 1)
    // file:///var/mobile/Containers/Data/Application/E35A82F5-EF4D-4F81-8767-59C4A054E213/Library/Caches/ (cordova.98fc7fcb7c020c1504f6.js, line 1)
    // file:///var/mobile/Containers/Data/Application/E35A82F5-EF4D-4F81-8767-59C4A054E213/Library/NoCloud/ (cordova.98fc7fcb7c020c1504f6.js, line 1)
    // file:///var/mobile/Containers/Data/Application/E35A82F5-EF4D-4F81-8767-59C4A054E213/Documents/ (cordova.98fc7fcb7c020c1504f6.js, line 1)
    // null (cordova.98fc7fcb7c020c1504f6.js, line 1)
    // null (cordova.98fc7fcb7c020c1504f6.js, line 1)
    // null (cordova.98fc7fcb7c020c1504f6.js, line 1)
    // null (cordova.98fc7fcb7c020c1504f6.js, line 1)
    // null (cordova.98fc7fcb7c020c1504f6.js, line 1)
    // file:///var/mobile/Containers/Data/Application/E35A82F5-EF4D-4F81-8767-59C4A054E213/Library/Cloud/ (cordova.98fc7fcb7c020c1504f6.js, line 1)
    // file:///private/var/mobile/Containers/Data/Application/E35A82F5-EF4D-4F81-8767-59C4A054E213/tmp/ (cordova.98fc7fcb7c020c1504f6.js, line 1)
  }
}
