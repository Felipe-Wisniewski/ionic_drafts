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
  id_brand: number;
  id_subdivision: number;

  layout: string;
  index = -1;
  isSelected = false;

  subscription$: Subscription[] = [];
  loaded = false;
  page = 1;

  templates: Object[];
  templates_post: Object[] = [];
  templates_story: Object[] = [];
  selectedTemplate: any;

  constructor(private storage: Storage, private templatesService: TemplatesService, private router: Router) { }

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
      this.getTemplates();
    });
  }

  getTemplates() {
    this.subscription$.push(this.templatesService.getTemplates(this.id_brand, this.id_subdivision, this.page)
      .subscribe(temp => {
        let post = temp.filter(t => t['layout'] == 'post');
        let story = temp.filter(t => t['layout'] == 'story');
        this.templates_post = this.templates_post.concat(post);
        this.templates_story = this.templates_story.concat(story);
        this.templates = this.templates_post;
        this.loaded = true;
        this.layout = "post";
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

  selectTemplate(template, index) {
    this.selectedTemplate = template;
    if (this.index == index) {
      this.isSelected = false;
    } else {
      this.index = index;
      this.isSelected = true;
    } 
  }

  navProducts() {
    if (this.isSelected) {
      this.storage.set('template', this.selectedTemplate).then(() => {
        this.router.navigate(['products']);
      });
    }
  }

  loadErrorImg(event) {
    event.target.src = 'assets/img/placeholder.png';
  }

  loadMore(iScroll) {
    setTimeout(() => {
      if (this.page < TemplatesService.pages) {
        this.page++;
        this.getTemplates();
      }
      iScroll.target.complete();
    }, 3500);
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe());
  }
}
