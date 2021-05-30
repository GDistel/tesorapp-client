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

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private tokensSvc: TokensService, private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler(error))
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    // if (this.tokensSvc.tokens && error.status === HttpStatusCode.Unauthorized) {
    //   this.tokensSvc.setTokens(null);
    // }
    const errorResponse = error?.error?.message || error?.statusText;
    this.snackBar.open(errorResponse);
    return throwError(errorResponse);
  }
}
