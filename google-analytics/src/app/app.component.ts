import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AnalyticsService } from './shared/analytics.service';
import { Router, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var ga;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private analytics: AnalyticsService,
    public router: Router,
    private title: Title
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let title = this.title.getTitle()

        if (this.router.getCurrentNavigation().extras.state) {
          title = this.router.getCurrentNavigation().extras.state.title
        }

        console.log('url', event.url)
        console.log('title', title)

        if (this.platform.is('desktop')) {
          console.log('desktop')
          ga('set', 'page', event.url)
          ga('send', 'pageview')

        } else {
          console.log('cordova')
          this.analytics.startTracker('UA-XXXX-1').then(() => {
            this.analytics.trackPage(event.url, title)
          })
        }
      }
    })
  }
}
