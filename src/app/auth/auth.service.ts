import { AuthApiService } from './auth-api.service';
import { Injectable } from '@angular/core';
import { TokensService } from 'src/app/core/http/tokens.service';
import { AuthRequest } from './interfaces';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokensSvc: TokensService,
    private authApiSvc: AuthApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  public async signIn(authRequest: AuthRequest): Promise<boolean> {
    try {
      const tokens = await this.authApiSvc.signIn(authRequest);
      this.tokensSvc.setTokens(tokens);
      return true;
    } catch (error) {
        console.error(error);
    }
    return false;
  }

  public signOut(): void {
    this.tokensSvc.setTokens(null);
    this.router.navigate(['/', 'signin']);
    this.snackBar.open('Your session has expired', 'close',  { duration: 2000 });
  }
}
