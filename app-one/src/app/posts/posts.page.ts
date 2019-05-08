import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

import { PostsService } from './posts.service';
import { Post } from './post';
import { Router } from '@angular/router';


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
  isSelected = false;

  subscription$: Subscription[] = [];
  loaded = false;
  page = 1;

  search = "";
  posts: Post[] = [];
  selectedPost: Post;

  constructor(private storage: Storage, private postsService: PostsService, private router: Router) { }

  ngOnInit() {
    this.getBrandId();
  }

  getBrandId() {
    this.storage.get('brand').then(brand => {
      if (brand.id_subdivision == undefined) {
        this.title = brand.brand;
        this.id_brand = brand.id_brand;
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
    this.selectedPost = post;
    this.isSelected = !this.isSelected;
  }

  navEditor() {
    this.storage.set('post', this.selectPost).then(() => {
      this.router.navigate(['editor']);
    });
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