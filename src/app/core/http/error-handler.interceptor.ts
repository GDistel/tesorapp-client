import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokensService } from 'src/app/auth/tokens.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshTokenService } from './refresh-token.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private tokensSvc: TokensService,
    private refreshTokenSvc: RefreshTokenService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler(error, request, next))
    );
  }

  private errorHandler(
    error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const errorResponse = error?.error?.message || error?.statusText;
    if (this.tokensSvc.tokens && error.status === HttpStatusCode.Unauthorized) {
      if (this.refreshTokenSvc.hasRefreshTokenExpired()) {
        this.handle401AndExpiredRefreshToken();
        return throwError(errorResponse);
      }
      this.refreshTokenSvc.markedForRefresh = true;
      return next.handle(request);
    }
    this.snackBar.open(errorResponse);
    return throwError(errorResponse);
  }

  private handle401AndExpiredRefreshToken(): void {
    this.refreshTokenSvc.markedForRefresh = false;
    this.tokensSvc.setTokens(null);
    this.router.navigate(['/', 'signin']);
    this.snackBar.open('Your session has expired');
  }
}
