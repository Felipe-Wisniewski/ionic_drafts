import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

import { TemplatesService } from './templates.service';
import { ToastController } from '@ionic/angular';
import { Template } from './template';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit, OnDestroy {

  title: string;
  id_brand: number;
  id_subdivision: number;

  layout = "post";
  page = 1;
  
  index = -1;
  isSelected = false;
  loaded = false;
  isEmpty = false;

  subscription$: Subscription[] = [];
  templates: Template[] = [];
  // templates_post: Template[] = [];
  // templates_story: Template[] = [];
  selectedTemplate: Template;

  constructor(private storage: Storage, 
    private templatesService: TemplatesService, 
    public toast: ToastController, 
    private router: Router) { }

  ngOnInit() {
    this.getBrandId();
  }

  getBrandId() {
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
      this.getTemplates();
    });
  }

  getTemplates() {
    this.subscription$.push(this.templatesService.getTemplates(this.id_brand, this.id_subdivision, this.layout, this.page)
      .subscribe(_templates => {
        console.log(_templates);
        _templates.forEach(temp => {
          this.templates.push(temp);
        });

        if (this.templates.length < 1) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
        // let post = temp.filter(t => t['layout'] == 'post');
        // let story = temp.filter(t => t['layout'] == 'story');
        // this.templates_post = this.templates_post.concat(post);
        // this.templates_story = this.templates_story.concat(story);
        // this.templates = this.templates_post;
        this.loaded = true;
      })
    );
  }

  selectPostStorie() {
    switch(this.layout) {
      case "post": {
        this.page = 1;
        this.templates = []
        this.index = -1;
        this.layout = "post"
        this.loaded = false
        this.isSelected = false;
        this.getTemplates()
        break;
      }
      case "story": {
        this.page = 1
        this.templates = []
        this.index = -1;
        this.layout = "story"
        this.loaded = false
        this.isSelected = false;
        this.getTemplates()
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
      this.index = -1;
      this.isSelected = false;
    } else {
      this.index = index;
      this.isSelected = true;
    } 
  }

  openProducts() {
    if (this.isSelected) {
      this.storage.set('template', this.selectedTemplate).then(() => {
        this.router.navigate(['products']);
      });
    } else {
      this.templatesService.toast("Selecione um template !");
    }
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

  loadErrorImg(event) {
    event.target.src = 'assets/img/placeholder.png';
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe());
  }
}
