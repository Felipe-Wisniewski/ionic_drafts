import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-templates-posts',
  templateUrl: './templates-posts.page.html',
  styleUrls: ['./templates-posts.page.scss'],
})
export class TemplatesPostsPage implements OnDestroy {

  cod_brand: string;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.getBrandId();
  }

  getBrandId() {
    this.subscription = this.route.queryParams.subscribe(
      params => {
        this.cod_brand = params['cod_brand'];
      }
    );
  }

  onClickTemplates() {
    this.router.navigate(['/templates'], {
      queryParams: {
        'cod_brand': this.cod_brand
      }
    });
  }

  onClickPosts() {
    this.router.navigate(['/templates'], {
      queryParams: {
        'cod_brand': this.cod_brand
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
