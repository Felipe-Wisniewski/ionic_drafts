import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-text-tools',
  templateUrl: './text-tools.page.html',
  styleUrls: ['./text-tools.page.scss'],
})
export class TextToolsPage implements OnInit {

  fonts = ['Arial', 'Calibri', 'Roboto', 'Times New Roman', 'Verdana']

  objText: any
  text = ''
  textFont = ''
  textSize = ''
  textColor = ''
  textOpacity = 0

  constructor(private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnChanges() {
    console.log('On  Changes')
  }

  ngOnInit() {
    console.log('ngOnInit')
    this.objText = this.navParams.get('objText')
    this.setTextSettings()
    // this.text = this.navParams.get('text')
    // this.textFont = this.navParams.get('textFont')
    // this.textSize = this.navParams.get('textSize')
    // this.textColor = this.navParams.get('textColor')
    // this.textOpacity = this.navParams.get('textOpacity')
  }

  setTextSettings() {
    console.log(this.objText)    
  }
}
