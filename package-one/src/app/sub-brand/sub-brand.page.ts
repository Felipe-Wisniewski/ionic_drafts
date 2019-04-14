import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sub-brand',
  templateUrl: './sub-brand.page.html',
  styleUrls: ['./sub-brand.page.scss'],
})
export class SubBrandPage implements OnInit, OnDestroy {

  brand: string;

  subscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBrand();
  }

  getBrand() {
    this.subscription = this.route.queryParams.subscribe(
      (params: any) => {
        console.log('getParams: ' + params['brand'])
        this.brand = params['brand'];
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
