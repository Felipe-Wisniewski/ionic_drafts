import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let url = state.url
    return this.verifyLogin(url)
  }

  private verifyLogin(url): boolean {
    if (!this.auth.isLoggedIn) {
      this.auth.redirectUrl = url
      this.router.navigate([''])
      return false

    } else {
      return true
    }
  }
}
