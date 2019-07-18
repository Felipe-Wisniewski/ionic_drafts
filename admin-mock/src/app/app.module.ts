import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TemplatesPopoverPageModule } from './templates/templates-popover/templates-popover.module';
import { EditorBackgroundPageModule } from './editor-template/editor-background/editor-background.module';
import { EditorStampsPageModule } from './editor-template/editor-stamps/editor-stamps.module';
import { EditorStampsPopoverPageModule } from './editor-template/editor-stamps-popover/editor-stamps-popover.module';
import { EditorIconsModalPageModule } from './editor-template/editor-icons-modal/editor-icons-modal.module';
import { EditorIconsPopoverPageModule } from './editor-template/editor-icons-popover/editor-icons-popover.module';
import { EditorBackgroundPopoverPageModule } from './editor-template/editor-background-popover/editor-background-popover.module';
import { EditorTextPopoverPageModule } from './editor-template/editor-text-popover/editor-text-popover.module';
import { ColorsPopoverPageModule } from './editor-template/colors-popover/colors-popover.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(), 
    AppRoutingModule,
    TemplatesPopoverPageModule,
    EditorBackgroundPageModule,
    EditorStampsPageModule,
    EditorStampsPopoverPageModule,
    EditorIconsModalPageModule,
    EditorIconsPopoverPageModule,
    EditorBackgroundPopoverPageModule,
    EditorTextPopoverPageModule,
    ColorsPopoverPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
