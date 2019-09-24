import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  title = 'APP_NAME'
  title_one = 'TITLE_ONE'
  description = 'DESCRIPTION'
  name = 'DATA.NAME'

  constructor() {}

  ngOnInit() {
  }
}
