import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PostsService } from './posts.service';
import { Observable } from 'rxjs';
import { Post } from './post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  
  cod_brand: string;
  posts$: Observable<Post[]>;

  constructor(private storage: Storage, private postsService: PostsService) { }

  ngOnInit() {
    this.getBrandId();
  }

  getBrandId() {
    this.storage.get('brand').then((it) => {
      this.cod_brand = it.cod_brand;
      console.log(it);
      this.getPosts();
    });
  }

  getPosts() {
    this.posts$ = this.postsService.getPosts(this.cod_brand);
  }

  onClickPost(postId) {
    console.log(postId);
  }

  segmentChanged($event) {
    console.log($event);
  }

  loadMore($event) {
    console.log($event);
  }
}