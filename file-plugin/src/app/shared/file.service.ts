import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private platform: Platform, private file: File) { }

  async readFile(file) {
    let fileBlob

    let reader = new FileReader()

    reader.onloadend = (fileReader) => {
      fileBlob = fileReader.target
    }

    await reader.readAsDataURL(file)
    return fileBlob
  }

  async checkDirectory(directoryName) {
    return await this.file.checkDir(this.getRootDirectory(), directoryName)
  }

  async createDirectory(directoryName) {
    return await this.file.createDir(this.getRootDirectory(), directoryName, false)
  }

  async writeFile(fileName, fileBlob) {
    return await this.file.writeFile(`${this.getRootDirectory()}Beira Rio`, fileName, fileBlob, { replace: false })
  }

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
    if (this.platform.is("ios")) return ''
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
  }
}
