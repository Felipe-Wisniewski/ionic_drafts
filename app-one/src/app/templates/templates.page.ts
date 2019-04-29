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

  id_brand: number;
  title: string;

  subscription$: Subscription[] = [];
  loaded = false;

  templates: Object[];
  temp_post: Object[] = [];
  temp_storie: Object[] = [];

  constructor(private storage: Storage, private templatesService: TemplatesService, private router: Router) { }

  ngOnInit() {
    this.getBrandId();
  }

  getBrandId() {
    this.storage.get('brand').then((brand) => {
      this.id_brand = brand.id;
      this.title = brand.brand;

      this.getTemplates();
    });
  }

  getTemplates() {
    this.subscription$.push(this.templatesService.getTemplates(this.id_brand)
      .subscribe(t => {
        let post = t.filter(it => it['layout'] == 'post');
        let storie = t.filter(it => it['layout'] == 'storie');
        this.temp_post = this.temp_post.concat(post);
        this.temp_storie = this.temp_storie.concat(storie);
        this.templates = this.temp_post;
        this.loaded = true;
      })
    );
  }

  selectPostStorie($event) {
    switch($event.detail.value) {
      case "post": {
        this.templates = this.temp_post;
        break;
      }
      case "storie": {
        this.templates = this.temp_storie;
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
