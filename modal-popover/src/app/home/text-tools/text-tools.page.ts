import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-text-tools',
  templateUrl: './text-tools.page.html',
  styleUrls: ['./text-tools.page.scss'],
})
export class TextToolsPage implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  closePopover() {
    this.popoverController.dismiss()
  }
}
