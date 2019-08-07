import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user = ''
  pwd = ''

  errorUser = false
  errorPwd = false
  messageUser = ''
  messagePwd = ''

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    if (this.user === '' || this.pwd === '') {

      if (this.user === '') {
        this.errorUser = true
        this.messageUser = '*usuário obrigatório!'
      } else {
        this.messageUser = ''
      }

      if (this.pwd === '') {
        this.errorPwd = true
        this.messagePwd = '*senha obrigatória!'
      } else {
        this.messagePwd = ''
      }

    } else {
      this.errorUser = false
      this.errorPwd = false
      this.authUser()
    }
  }

  authUser() {
    this.router.navigate(['templates'])
/*     this.auth.login(this.user, this.pwd)
      .subscribe(() => { this.router.navigate(['templates']) }) */
  }
}