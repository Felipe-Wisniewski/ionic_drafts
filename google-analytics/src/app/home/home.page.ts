import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../shared/analytics.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private analytics: AnalyticsService) {}

  ngOnInit(): void {
    this.analytics.trackPage('home', null)
  }
}
