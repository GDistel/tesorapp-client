import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import { RefreshTokenService } from './refresh-token.service';
import { TokensService } from './tokens.service';
import { Tokens } from './interfaces';
import { AuthService } from 'src/app/auth/auth.service';
import { EMPTY } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private refreshTokenService: RefreshTokenService,
    private tokensService: TokensService,
    private authService: AuthService
  ){}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const tokens = this.tokensService.tokens;
    if (this.isApiUrl(request.url)){
        if (this.tokensService.hasRefreshTokenExpired()) {
          this.authService.signOut();
          return EMPTY;
        }
        if (this.refreshTokenService.tokenNeedsRefresh()) {
            return this.handleByRefreshingAccessToken(request, next);
        }
        if (this.refreshTokenService.hasToWaitForRefresh()) {
            return this.handleByWaitingForRefresh(request, next);
        }
        request = this.addTokenToRequest(tokens?.access as string, request);
        return next.handle(request);
    }
    return next.handle(request);
  }

  private handleByRefreshingAccessToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return this.refreshTokenService.refreshAccessToken().pipe(
      switchMap((tokens: Tokens | null) => {
        request = this.addTokenToRequest(tokens?.access as string, request);
        return next.handle(request);
      }),
    )
  }

  private handleByWaitingForRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return this.refreshTokenService.waitForAccessTokenRefresh().pipe(
      switchMap((tokens: Tokens | null) => {
        request = this.addTokenToRequest(tokens?.access as string, request);
        return next.handle(request);
      })
    )
  }

  private isApiUrl(url: string): boolean{
    const isApiUrl: boolean = url.startsWith(environment.apiUrl);
    const isSignInUrl: boolean = url.includes('auth/signin');
    const isTokenRefreshUrl: boolean = url.includes('auth/refresh');
    return isApiUrl && !isSignInUrl && !isTokenRefreshUrl;
  }

  private addTokenToRequest(token: string, request: HttpRequest<any>): HttpRequest<any>{
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    request = request.clone({ headers });
    return request;
  }

}
