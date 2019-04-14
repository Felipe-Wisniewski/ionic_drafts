import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { TemplateService } from './template.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit, OnDestroy {

  idBrand: string;

  subscription: Subscription;

  constructor(private templateService: TemplateService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBrandId();
    this.loadTemplates();
  }

  getBrandId() {
    this.subscription = this.route.queryParams.subscribe(
      (params: any) => {
        console.log('getBrand: ' + params['id'])
        this.idBrand = params['id'];
      }
    );
  }

  loadTemplates() {
    this.subscription = this.templateService.getTemplates().subscribe(
      (data) => {
        console.log(data)
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
