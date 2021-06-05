import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import { RefreshTokenService } from 'src/app/auth/refresh-token.service';
import { TokensService } from 'src/app/auth/tokens.service';
import { Tokens } from 'src/app/auth/interfaces';
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
    if (this.isAuthRouteOrThirdParty(request.url)) {
      return next.handle(request);
    }
    if (this.tokensService.hasRefreshTokenExpired()) {
      // the session expired
      this.authService.signOut();
      return EMPTY;
    }
    if (this.refreshTokenService.tokenNeedsRefresh()) {
      return this.handleByRefreshingAccessToken(request, next);
    }
    if (this.refreshTokenService.hasToWaitForRefresh()) {
      return this.handleByWaitingForRefresh(request, next);
    }
    const tokens = this.tokensService.tokens;
    const authorizedRequest = this.addTokenToRequest(tokens?.access as string, request);
    return next.handle(authorizedRequest);
  }

  private handleByRefreshingAccessToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Tokens | null>>{
    const obs = this.refreshTokenService.refreshAccessToken();
    return this.addTokenPipe(obs, request, next);

  }

  private handleByWaitingForRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Tokens | null>>{
    const obs = this.refreshTokenService.waitForAccessTokenRefresh();
    return this.addTokenPipe(obs, request, next);
  }

  private addTokenPipe(
    obs: Observable<Tokens | null>, request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<Tokens | null>> {
    return obs.pipe(switchMap((tokens: Tokens | null) => {
      request = this.addTokenToRequest(tokens?.access as string, request);
      return next.handle(request);
    }));
  }

  private isAuthRouteOrThirdParty(url: string): boolean {
    const isThirdPartyUrl: boolean = !url.startsWith(environment.apiUrl);
    const isSignInUrl: boolean = url.includes('auth/signin');
    const isTokenRefreshUrl: boolean = url.includes('auth/refresh');
    return isSignInUrl || isTokenRefreshUrl || isThirdPartyUrl ;

  }

  private addTokenToRequest(token: string, request: HttpRequest<any>): HttpRequest<any>{
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return request.clone({ headers });
  }

}
