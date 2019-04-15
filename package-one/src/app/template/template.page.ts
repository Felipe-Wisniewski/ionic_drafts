import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { TemplateService } from './template.service';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  idBrand: number;
  templates = [];
  page = 1;
  maxPage: number;

  subscription: Subscription;

  constructor(private templateService: TemplateService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBrandId();
    this.loadTemplates();
  }

  getBrandId() {
    this.subscription = this.route.queryParams.subscribe(
      (params: any) => { this.idBrand = params['id']; });
  }

  loadTemplates(event?) {
    this.subscription = this.templateService.getTemplates(this.page).subscribe(
      res => {
        this.templates = this.templates.concat(res['templates']);
        this.maxPage = res['pages'];

        if (event) {
          console.log(`loadComplete page: ${this.page} - maxPage: ${this.maxPage}`);
          event.target.complete();
        }
      }
    );
  }

  loadMore(event) {
    console.log(`page: ${this.page}`);
    this.page++;
    console.log(`page:: ${this.page}`);

    this.loadTemplates(event);

    if (this.page === this.maxPage) {
      console.log(`loadMore page: ${this.page} - maxPage: ${this.maxPage}`);
      event.target.disable = true;
    }
  }
  
  toggleInfiniteScroll() {
    console.log("toggleInfiniteScroll");
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
