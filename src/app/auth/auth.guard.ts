import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokensService } from './tokens.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokensSvc: TokensService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokensSvc.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/signin'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
