import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

import { Post } from '../model/post';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit, OnDestroy {

  title: string
  id_brand: number
  id_subdivision: number
  
  layout = "post"
  page = 1
  search = ""

  index = -1
  isSelected = false
  loaded = false
  isEmpty = false

  subscription$: Subscription[] = []
  posts: Post[] = []
  selectedPost: Post

  constructor(private storage: Storage, private postsService: PostsService, private router: Router) { }

  ngOnInit() {
    this.getBrand()
  }

  getBrand() {
    this.storage.get('brand').then(brand => {
      if (brand.id != null || brand.id != undefined) {
        this.title = brand.brand
        this.id_brand = brand.id
        this.id_subdivision = null
      
      } else {
        this.title = brand.sub
        this.id_brand = null
        this.id_subdivision = brand.id_subdivision
      }     
      this.getPosts()
    })
  }

  getPosts() {
    this.subscription$.push(this.postsService.getPosts(this.id_brand, this.id_subdivision, this.layout, this.page, this.search)
      .subscribe(_posts => { 
        _posts.forEach(post => {
          this.posts.push(post)
        })

        if (this.posts.length < 1) {
          this.isEmpty = true
        
        }else {
          this.isEmpty = false
        }
        this.loaded = true
      })
    )
  }

  searchPosts() {
    this.page = 1
    this.posts = []
    this.loaded = false
    this.getPosts()
  }

  selectPostStory() {
    switch(this.layout) {
      case "post": {
        this.page = 1
        this.posts = []
        this.layout = "post"
        this.loaded = false
        this.getPosts()
        break
      }
      case "story": {
        this.page = 1
        this.posts = []
        this.layout = "story"
        this.loaded = false
        this.getPosts()
        break
      }
      default: {
        break
      }    
    }
  }
  
  selectPost(post, index) {
    this.selectedPost = post

    if (this.index == index) {
      this.index = -1
      this.isSelected = false

    } else {
      this.index = index
      this.isSelected = true
    }
  }

  openEditor() {
    if (this.isSelected) {
      this.storage.remove('template')
      this.storage.remove('products')
      this.storage.set('post', this.selectedPost).then(() => {
        this.router.navigate(['editor'])
      })

    } else {
      this.postsService.toast("Selecione uma imagem !")
    }
  }

  loadMore(iScroll) {
    setTimeout(() => {
      if (this.page < PostsService.pages) {
        this.page++
        this.getPosts()
      }

      iScroll.target.complete()
    }, 3500)
  }
  
  loadErrorImg(event) {
    event.target.src = 'assets/img/placeholder.png';
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe())
  }
}
