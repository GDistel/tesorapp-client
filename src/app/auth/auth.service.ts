import { RefreshTokenService } from 'src/app/auth/refresh-token.service';
import { AuthApiService } from './auth-api.service';
import { Injectable } from '@angular/core';
import { TokensService } from './tokens.service';
import { AuthRequest, Tokens } from './interfaces';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, first, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokensSvc: TokensService,
    private refreshTokenSvc: RefreshTokenService,
    private authApiSvc: AuthApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  public async signIn(authRequest: AuthRequest): Promise<boolean> {
    try {
      const tokens = await this.authApiSvc.signIn(authRequest);
      this.tokensSvc.setTokens(tokens, authRequest.remember);
      this.snackBar.open('You have successfully logged in', '', { duration: 3000 });
      return !!tokens;
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  public async signUp(authRequest: AuthRequest): Promise<boolean> {
    try {
      authRequest.verifyUrl = `${window.origin}/signin?refreshToken=`;
      await this.authApiSvc.signUp(authRequest);
      this.snackBar.open('Check your inbox and confirm your email', '', { duration: 5000 });
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  public signOut(): void {
    this.tokensSvc.setTokens(null);
    this.router.navigate(['/', 'signin']);
    this.snackBar.open('Your have been logged out', '', { duration: 3000 });
  }

  public isUserAuthenticated(): boolean {
    return !!this.tokensSvc.tokens;
  }

  public getUser(): string {
    return this.tokensSvc.accessTokenPayload?.username;
  }

  public signInWithRefreshToken(token: string): Subject<void> {
    const successSubject = new Subject<void>();
    this.refreshTokenSvc.requestTokenRefresh(token).pipe(
      tap(tokens => successSubject.next()),
      first()
    ).subscribe({
      next: this.tokensSvc.setTokens.bind(this.tokensSvc),
      error: successSubject.error
    });
    return successSubject;
  }
}
