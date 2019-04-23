import { Component, OnInit } from '@angular/core';
import { Observable, Subject, empty } from 'rxjs';
import { Storage } from '@ionic/storage';
import { TemplatesService } from './templates.service';
import { catchError, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {

  cod_brand: string;
  desc_brand: string;

  templates: Object[];
  t_post: Object[];
  t_storie: Object[];

  templates$: Observable<Object[]>;
  error$ = new Subject<boolean>();

  constructor(private storage: Storage, private templatesService: TemplatesService) { }

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
    this.templates$ = this.templatesService.getTemplates(this.cod_brand)
      .pipe(
        catchError(error => {
          this.error$.next(true);
          return empty();
        }),
        tap(t => {
          console.log(t);
          this.t_post = t.filter(it => it['layout'] == 'post');
          console.log(this.t_post);
          this.t_storie = t.filter(it => it['layout'] == 'storie');
          console.log(this.t_storie);
        })
      );
  }

  segmentChanged($event) {
    switch($event) {
      case 'post':
        this.templates = this.t_post;
      case 'storie':
        this.templates = this.t_storie;
    }
    /* 
    if ($event.detail.value == "post") {
      this.templates = this.t_post;
      console.log("POST");
    } else {
      this.templates = this.t_storie;
      console.log("STORIE");
    } */
  }

  selectTemplate(template) {

  }

  loadMore($event) {

  }
}
