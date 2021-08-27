import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { catchError, filter, first, tap } from "rxjs/operators";
import { AuthApiService } from "src/app/auth/auth-api.service";
import { Tokens } from "./interfaces";
import { TokensService } from "./tokens.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  private tokenRefreshInProgress = false;
  private refreshAccessTokenSubject = new BehaviorSubject<Tokens | null>(null);

  constructor(
    private tokensService: TokensService, private authApiSvc: AuthApiService
  ) { }

  public refreshAccessToken(): Observable<Tokens>{
    return this.requestTokenRefresh().pipe(
      tap((tokens: Tokens) => {
        this.tokensService.setTokens(tokens);
        this.tokenRefreshInProgress = false;
        this.refreshAccessTokenSubject.next(tokens);
      })
    )
  }

  public waitForAccessTokenRefresh(): Observable<Tokens | null>{
    return this.refreshAccessTokenSubject.pipe(
      filter(result => result !== null),
      first()
    );
  }

  public requestTokenRefresh(refreshToken?: string): Observable<Tokens> {
    const tokens = this.tokensService.getTokensFromStorage() as Tokens;
    return this.authApiSvc.refreshToken(refreshToken ?? tokens?.refresh);
  }

  public tokenNeedsRefresh(): boolean{
    return this.tokensService.hasAccessTokenExpired() && !this.tokenRefreshInProgress;
  }

  public hasToWaitForRefresh(): boolean{
    return this.tokensService.hasAccessTokenExpired() && this.tokenRefreshInProgress;
  }

}
