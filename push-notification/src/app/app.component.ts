import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  language: string = navigator.language.slice(0, 2)
  languages = ['en', 'pt', 'es']

  constructor(
    private platform: Platform,
    private fcm: FCM,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.initializeGoogleServices()

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initializeGoogleServices() {
    if (this.platform.is("mobile")) {
      this.languages.forEach((lang) => {
        if (lang != this.language) this.fcm.unsubscribeFromTopic("all-" + lang)
      })
    }
    this.fcm.subscribeToTopic("all-" + this.language)
    
    console.log(this.fcm.getToken())
  }
}
