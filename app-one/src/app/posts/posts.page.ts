import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, Subject, empty } from 'rxjs';

import { PostsService } from './posts.service';
import { Post } from './post';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  
  cod_brand: string;
  desc_brand: string;

  posts$: Observable<Post[]>;
  error$ = new Subject<boolean>();

  constructor(private storage: Storage, private postsService: PostsService) { }

  ngOnInit() {
    this.getBrandId();
  }

  getBrandId() {
    this.storage.get('brand').then((it) => {
      this.cod_brand = it.cod_brand;
      this.desc_brand = it.desc_brand;

      this.getPosts();
    });
  }

  getPosts() {
    this.posts$ = this.postsService.getPosts(this.cod_brand)
      .pipe(
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty();
        }),
        //filtrar por post/storie
        //get passando a página
        tap(console.log)
      );
  }

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

  loadMore(iScroll) {
    console.log("begin");

    setTimeout(() => {
      console.log("end");
      iScroll.target.complete();
    }, 2500);
  }
}