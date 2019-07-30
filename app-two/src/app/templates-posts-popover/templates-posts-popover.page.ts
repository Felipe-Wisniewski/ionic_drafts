import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-templates-posts-popover',
  templateUrl: './templates-posts-popover.page.html',
  styleUrls: ['./templates-posts-popover.page.scss'],
})
export class TemplatesPostsPopoverPage implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  closePopover() {
    this.popoverController.dismiss()
  }
}
