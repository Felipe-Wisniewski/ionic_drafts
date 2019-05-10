import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

import { PostsService } from './posts.service';
import { Post } from './post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit, OnDestroy {
  
  title: string;
  id_brand: number;
  id_subdivision: number;
  
  layout: string;
  index = -1;
  isSelected = false;

  subscription$: Subscription[] = [];
  loaded = false;
  page = 1;

  search = "";
  posts: Post[] = [];
  posts_post: Post[] = [];
  posts_story: Post[] = [];
  selectedPost: Post;

  constructor(private storage: Storage, 
    private postsService: PostsService, 
    public toast: ToastController, 
    private router: Router) { }

  ngOnInit() {
    this.getBrand();
  }

  getBrand() {
    this.storage.get('brand').then(brand => {
      if (brand.id != null || brand.id != undefined) {
        this.title = brand.brand;
        this.id_brand = brand.id;
        this.id_subdivision = null;
      } else {
        this.title = brand.sub;
        this.id_brand = null;
        this.id_subdivision = brand.id_subdivision;
      }     
      this.getPosts();
    });
  }

  getPosts() {
    this.subscription$.push(this.postsService.getPosts(this.id_brand, this.id_subdivision, this.page, this.search)
      .subscribe(_posts => { 
        _posts.forEach(post => {
          this.posts.push(post);
          
          // desenvolver post / story

        });
        this.loaded = true;
      })
    );
  }

  searchPosts() {
    this.page = 1;
    this.posts = [];
    this.loaded = false;
    this.getPosts();
  }

//filtrar post / story
  selectPostStorie() {
    switch(this.layout) {
      case "post": {
        console.log("post");
        break;
      }
      case "story": {
        console.log("story");
        break;
      }
      default: {
        break;
      }    
    }
  }
  
  selectPost(post, index) {
    this.selectedPost = post;
    if (this.index == index) {
      this.index = -1;
      this.isSelected = false;  
    } else {
      this.index = index;
      this.isSelected = true;
    }
  }

  navEditor() {
    if (this.isSelected) {
      this.storage.set('post', this.selectedPost).then(() => {
        this.router.navigate(['editor']);
      });
    } else {
      this.alertToast();
    }
  }

  async alertToast() {
    const toast = await this.toast.create({
      message: 'Selecione uma imagem !',
      duration: 2000
    });
    toast.present();
  }

  loadMore(iScroll) {
    setTimeout(() => {
      if (this.page < PostsService.pages) {
        this.page++;
        this.getPosts();
      }
      iScroll.target.complete();
    }, 3500);
  }
  
  loadErrorImg(event) {
    event.target.src = 'assets/img/placeholder.png';
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe());
  }
}