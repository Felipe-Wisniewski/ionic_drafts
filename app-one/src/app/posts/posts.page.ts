import { Component, OnInit, OnDestroy } from '@angular/core';
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
  id_brand: number = 0;
  id_sub: number = 0;
  
  page: number = 1;
  loaded = false;
  subscription$: Subscription[] = [];

  posts: Post[] = [];
  search: string = "";

  constructor(private storage: Storage, private postsService: PostsService) { }

  ngOnInit() {
    this.getBrandId();
  }

  getBrandId() {
    this.storage.get('brand').then((brand) => {
      this.title = brand.brand;
      this.id_brand = brand.id_brand;
      this.id_sub = brand.id_sub;
      console.log(brand);
      console.log(`id_brand -> ${this.id_brand}`);
      console.log(`id_sub -> ${this.id_sub}`);
      this.getPosts();
    });
  }

  getPosts() {
    this.subscription$.push(this.postsService.getPosts(this.id_brand, this.id_sub, this.page, this.search)
      .subscribe(p => { 
        p.forEach(post => {
          this.posts.push(post);
        });
        this.loaded = true;
      })
    );
  }

  searchPosts() {
    this.page = 1;
    this.posts = [];
    this.getPosts();
  }

//filtrar por post/storie
  selectPostStorie($event) {
    switch($event.detail.value) {
      case "post": {
        console.log($event.detail.value);
        break;
      }
      case "storie": {
        console.log($event.detail.value);
        break;
      }
      default: {
        break;
      }    
    }
  }
  
  selectPost(post) {
    console.log(post);
  }

  loadErrorImg(event) {
    event.target.src = 'assets/img/placeholder.png';
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

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe());
  }
}