import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokensService } from 'src/app/auth/tokens.service';
import { environment } from 'src/environments/environment';
import { catchError, switchMap } from 'rxjs/operators';
import { RefreshTokenService } from './refresh-token.service';
import { Tokens } from 'src/app/auth/interfaces';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
      private refreshTokenService: RefreshTokenService,
      private tokensService: TokensService
  ){}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const tokens = this.tokensService.tokens;
      if (this.isApiUrl(request.url)){
          if (this.refreshTokenService.tokenNeedsRefresh()) {
              return this.handleByRefreshingAccessToken(request, next);
          }
          if (this.refreshTokenService.hasToWaitForRefresh()) {
              return this.handleByWaitingForRefresh(request, next);
          }
          this.refreshTokenService.markedForRefresh = false;
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
    const isSignInUrl: boolean = url.includes('/signin');
    const isTokenRefreshUrl: boolean = url.includes('/refresh');
    return isApiUrl && !isSignInUrl && !isTokenRefreshUrl;
  }

  private addTokenToRequest(token: string, request: HttpRequest<any>): HttpRequest<any>{
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    request = request.clone({ headers });
    return request;
  }

}
