import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokensService } from 'src/app/auth/tokens.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokensSvc: TokensService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokens = this.tokensSvc.tokens;
    const requestsApiUrl = request.url.startsWith(environment.apiUrl);
    console.log(tokens)
    if (tokens && requestsApiUrl) {
        const authorizedRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${tokens.access}` }
        });
        return next.handle(authorizedRequest);
    }
    return next.handle(request);
  }
}
