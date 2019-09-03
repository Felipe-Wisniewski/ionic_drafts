import { Component } from '@angular/core';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private storageService: StorageService) { }

  save(num) {
    switch (num) {
      case 1: {
        console.log(this.storageService.saveBrandsApp([{ id: "1", brand: 'teste1' }, { id: "2", brand: 'teste2' }]))
        break
      }
      case 2: {
        console.log(this.storageService.saveHomeCache([{ id: "3", brand: 'teste3' }, { id: "4", brand: 'teste4' }]))
        break
      }
      case 3: {
        console.log(this.storageService.savePostGallery("111", { id: 111, image: 'lalala111' }))
        console.log(this.storageService.savePostGallery("123", { id: 123, image: 'lalala123' }))
        console.log(this.storageService.savePostGallery("444", { id: 444, image: 'lalala444' }))
        break
      }
      case 4: {
        console.log(this.storageService.saveLogoGallery("456", { id: 456, image: 'logo456' }))
        console.log(this.storageService.saveLogoGallery("156", { id: 156, image: 'logo156' }))
        console.log(this.storageService.saveLogoGallery("556", { id: 556, image: 'logo556' }))
        break
      }
      default: {
        break
      }
    }
  }

  get(num) {
    switch (num) {
      case 1: {
        console.log(this.storageService.getBrandsApp())
        break
      }
      case 2: {
        console.log(this.storageService.getHomeCache())
        break
      }
      case 3: {
        console.log(this.storageService.getPostsGallery())
        break
      }
      case 4: {
        this.storageService.getLogosGallery().then((it) => {
          console.log(it)
        })
        break
      }
      default: {
        break
      }
    }
  }
}
