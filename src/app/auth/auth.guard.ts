import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authSvc: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authSvc.isUserAuthenticated()) {
      return true;
    }
    this.router.navigate(['/', 'signin'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
