import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  logo = 'assets/img/logo.png'

  user = ''
  pwd = ''

  errorUser = false
  errorPwd = false
  messageUser = ''
  messagePwd = ''

  constructor(private homeService: HomeService, private router: Router) { }

  validForm() {

    if (this.user === '' || this.pwd === '') {

      if (this.user === '') {
        this.errorUser = true
        this.messageUser = '* Usuário inválido!'
      } else {
        this.messageUser = ''
      }

      if (this.pwd === '') {
        this.errorPwd = true
        this.messagePwd = '* Senha inválida!'
      } else {
        this.messagePwd = ''
      }

    } else {
      this.errorUser = false
      this.errorPwd = false
      this.login()
    }
  }

  login() {
    this.router.navigate(['templates'])
    /* this.homeService.login(this.user, this.pwd)
      .subscribe((resp) => {
        console.log(resp)
      }) */
  }
}