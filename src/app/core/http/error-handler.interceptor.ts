import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private authSvc: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler(error))
    );
  }

  private errorHandler(errorResponse: HttpErrorResponse): Observable<any> {
    const err = errorResponse?.error?.message || errorResponse?.error?.error || errorResponse?.status;
    if (errorResponse.status === 409) {
      // The user has logged into another device or duplicated his session in another browser
      this.authSvc.signOut(err);
    } else {
      this.snackBar.open(err, 'close',  { duration: 4000 });
    }
    return throwError(errorResponse);
  }

}
