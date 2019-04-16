import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

import { TemplateService } from './template.service';


@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit, OnDestroy {
  
  subscription: Subscription;
  
  id_brand: number;
  // id_lang: number = null; //descobrir os id de idiomas

  templates$: Observable<Object[]>;

  constructor(private templateService: TemplateService, private route: ActivatedRoute) {
    this.getBrandId();
  }
  
  getBrandId() {
    this.subscription = this.route.queryParams.subscribe(
      (params: any) => { 
        this.id_brand = params['id_brand']; 
      });
  }

  ngOnInit() {
    this.loadTemplates();
  }

  loadTemplates() {
    this.templates$ = this.templateService.getTemplates(this.id_brand/* , this.id_lang */)
      .pipe(
        tap(console.log),
        map(resp => resp['templates'])
      );
  }

  loadMore(event) {
    setTimeout(() => {
/*       console.log(this.page);
      if (this.page == this.maxPage) {
        event.target.complete();
        return;
      }

      if (this.page == this.maxPage) {
        event.target.disabled = true;
      }

      this.page++;
      this.loadTemplates();
 */
    }, 2500);
  }
 
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}