import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  option = 'posts'
  search = ''

  loaded = false
  hideSearch = false

  listImages = []
  posts = []
  logos = []

  constructor() { }

  ngOnInit() {
  }

  searchPost() {

  }

  searchCancel() {

  }

  selectPostLogo() {

  }

  selectImage(image, idx) {

  }

  loadMore(event) {

  }

  openEditor() {
    
  }

  loadErrorImg(event) {

  }
}
