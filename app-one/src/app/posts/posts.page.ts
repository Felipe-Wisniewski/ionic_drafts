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
  
  desc_brand: string;
  cod_brand: string;
  
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
      this.desc_brand = brand.desc_brand;
      this.cod_brand = brand.cod_brand;
      this.getPosts();
    });
  }

  getPosts() {
    this.subscription$.push(this.postsService.getPosts(this.cod_brand, this.page, this.search)
      .subscribe(p => { 
        console.log(p);
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