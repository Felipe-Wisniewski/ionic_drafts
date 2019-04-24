import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, empty } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TemplatesService } from './templates.service';
import { catchError, tap, filter, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {

  cod_brand: string;
  desc_brand: string;

  response$: Observable<Object[]>;
  error$ = new Subject<boolean>();

  templates: Object[];
  t_post: Object[] = [];
  t_storie: Object[] = [];

  constructor(private storage: Storage, private templatesService: TemplatesService, private router: Router) { }

  ngOnInit() {
    this.getBrandId();
  }

  getBrandId() {
    this.storage.get('brand').then((it) => {
      this.cod_brand = it.cod_brand;
      this.desc_brand = it.desc_brand;

      this.getTemplates();
    });
  }

  getTemplates() {
    this.response$ = this.templatesService.getTemplates(this.cod_brand).pipe(
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty();
        }),
        tap(t => {
          let post = t.filter(it => it['layout'] == 'post');
          let storie = t.filter(it => it['layout'] == 'storie');
          this.t_post = this.t_post.concat(post);
          this.t_storie = this.t_storie.concat(storie);
          this.templates = this.t_post;
        })
      );
  }

  selectPostStorie($event) {
    switch($event.detail.value) {
      case "post": {
        this.templates = this.t_post;
        break;
      }
      case "storie": {
        this.templates = this.t_storie;
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

  loadMore(iScroll) {
    console.log("begin");

    setTimeout(() => {
      console.log("end");
      iScroll.target.complete();
    }, 2500);
  }
}
