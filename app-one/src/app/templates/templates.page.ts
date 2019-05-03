import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

import { TemplatesService } from './templates.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit, OnDestroy {

  title: string;
  id_brand?: number;
  id_sub?: number;
  layout: string;

  subscription$: Subscription[] = [];
  loaded = false;

  templates: Object[];
  templates_post: Object[] = [];
  templates_story: Object[] = [];

  constructor(private storage: Storage, private templatesService: TemplatesService, private router: Router) { }

  ngOnInit() {
    this.getBrandId();
  }

  getBrandId() {
    this.storage.get('brand').then((brand) => {
      this.title = brand.brand;
      this.id_brand = brand.id_brand;
      this.id_sub = brand.id_sub;
      this.getTemplates();
    });
  }

  getTemplates() {
    this.subscription$.push(this.templatesService.getTemplates(this.id_brand, this.id_sub)
      .subscribe(tpts => {
        let post = tpts.filter(t => t['layout'] == 'post');
        let story = tpts.filter(t => t['layout'] == 'story');
        this.templates_post = this.templates_post.concat(post);
        this.templates_story = this.templates_story.concat(story);
        this.templates = this.templates_post;
        this.loaded = true;
        this.layout = "post"
      })
    );
  }

  selectPostStorie() {
    switch(this.layout) {
      case "post": {
        this.templates = this.templates_post;
        break;
      }
      case "story": {
        this.templates = this.templates_story;
        break;
      }
      default: {
        break;
      }    
    }
  }

  selectTemplate(template) {
    this.storage.set('template', template);
    this.router.navigate(['products']);
  }

  loadErrorImg(event) {
    event.target.src = 'assets/img/placeholder.png';
  }

  //desenvolver scroll
  loadMore(iScroll) {
    console.log("begin");
    setTimeout(() => {
      console.log("end");
      iScroll.target.complete();
    }, 2500);
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe());
  }
}
