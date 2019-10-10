import { Injectable } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private ga: GoogleAnalytics) {
  }
  
  startTracker(id) {
    return this.ga.startTrackerWithId(id)
  }

  trackPage(page, details) {
    this.ga.trackView(page, details)
  }
}