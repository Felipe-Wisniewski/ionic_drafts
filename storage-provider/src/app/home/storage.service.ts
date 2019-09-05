import { Injectable, ɵConsole } from '@angular/core';
import { Storage } from '@ionic/storage';
// import * as localforage from "localforage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  APP = { BRAND: 'brand', TEMPLATE: 'template', POST: 'post' }
  CACHE = { HOME: 'home' }

  editor = new Storage({ name: 'brAppEditor', storeName: 'app', driverOrder: ['indexeddb', 'sqlite', 'websql'] })
  cache = new Storage({ name: 'brAppCache', storeName: 'cache', driverOrder: ['indexeddb', 'sqlite', 'websql'] })
  posts = new Storage({ name: 'brAppPosts', storeName: 'posts', driverOrder: ['indexeddb', 'sqlite', 'websql'] })
  logos = new Storage({ name: 'brAppLogos', storeName: 'logos', driverOrder: ['indexeddb', 'sqlite', 'websql'] })

  constructor() { }

  // EDITOR
  saveBrandsApp(value) {
    return this.setEditorStorage(this.APP.BRAND, value)
  }

  getBrandsApp() {
    return this.getEditorStorage(this.APP.BRAND)
  }

  private setEditorStorage(key, value) {
    return this.editor.set(key, value)
  }

  private getEditorStorage(key) {
    return this.editor.get(key)
  }

  // CACHE
  saveHomeCache(value) {
    return this.setCacheStorage(this.CACHE.HOME, value)
  }

  getHomeCache() {
    return this.getCacheStorage(this.CACHE.HOME)
  }

  private setCacheStorage(key, value) {
    return this.cache.set(key, value)
  }

  private getCacheStorage(key) {
    return this.cache.get(key)
  }

  // POSTS
  savePostGallery(id, value) {
    return this.setPostStorage(id, value)
  }

  getPostsGallery() {
    return this.getPostsStorage()
  }

  private setPostStorage(key, value) {
    return this.posts.set(key, value)
  }

  private async getPostsStorage() {
    let _posts = []
    await this.posts.forEach(p => _posts.push(p))
    return _posts
  }

  // LOGOS
  saveLogoGallery(id, value) {
    return this.setLogoStorage(id, value)
  }

  private setLogoStorage(key, value) {
    return this.logos.set(key, value)
  }

  getLogosGallery() {
    return this.getLogosStorage()
  }

  private async getLogosStorage() {
    let _logos = []
    await this.logos.forEach((l) => {
      _logos.push(l)
    })
    return _logos
  }
}
