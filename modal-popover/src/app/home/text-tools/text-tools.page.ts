import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-text-tools',
  templateUrl: './text-tools.page.html',
  styleUrls: ['./text-tools.page.scss'],
})
export class TextToolsPage implements OnInit {

  text = 'TEXTO'
  fonts = ['Arial', 'Calibri', 'Roboto', 'Times New Roman', 'Verdana']
  font = 'Select font'

  constructor(private popoverController: PopoverController) { 
    this.log('construtor');
  }

  closePopover() {
    
  }

  ngOnChanges() {
    this.log('ngOnChanges');
  }

  ngOnInit() {
    this.log('ngOnInit');
  }

  ngDoCheck() {
    this.log('ngDoCheck');
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    this.log('ngAfterContenChecked');
  }

  ngAfterViewChecked() {
    this.log('ngAfterViewChecked');
  }

  ngOnDestroy() {
    this.log('ngOnDestroy');
    this.closePopover()
  }

  private log(hook: string) {
    console.log(hook);
  }

}
