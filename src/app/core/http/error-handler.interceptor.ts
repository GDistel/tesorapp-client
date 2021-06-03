import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler(error))
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    const errorResponse = error?.error?.message || error?.statusText;
    this.snackBar.open(errorResponse, 'close',  { duration: 2000 });
    return throwError(errorResponse);
  }

}
