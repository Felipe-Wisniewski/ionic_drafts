import { Component, OnInit } from '@angular/core';
import { literalMap } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  lang = window.navigator.language

  constructor() {}

  ngOnInit() {
    console.log(window.navigator.language)
  }
}
