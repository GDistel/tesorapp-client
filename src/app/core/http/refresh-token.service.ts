import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
import { Tokens } from "src/app/auth/interfaces";
import { TokensService } from "src/app/auth/tokens.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  public markedForRefresh = false;
  public tokenRefreshInProgress = false;
  private refreshAccessTokenSubject = new BehaviorSubject<Tokens | null>(null);

  constructor(private tokensService: TokensService) { }

  public refreshAccessToken(): Observable<Tokens>{
    return this.tokensService.refreshToken().pipe(
      tap((tokens: Tokens) => {
        this.tokensService.setTokens(tokens);
        this.tokenRefreshInProgress = false;
        this.refreshAccessTokenSubject.next(tokens);
      }),
    )
  }

  public waitForAccessTokenRefresh(): Observable<Tokens | null>{
    return this.refreshAccessTokenSubject.pipe(
      filter(result => result !== null),
      first()
    );
  }

  public tokenNeedsRefresh(): boolean{
    if (this.markedForRefresh) {
      return this.hasAccessTokenExpired() && !this.tokenRefreshInProgress;
    }
    return this.markedForRefresh && !this.tokenRefreshInProgress;
  }

  public hasToWaitForRefresh(): boolean{
    if (this.markedForRefresh) {
      return this.hasAccessTokenExpired() && this.tokenRefreshInProgress;
    }
    return this.markedForRefresh && this.tokenRefreshInProgress;
  }

  private hasAccessTokenExpired(): boolean {
    const tokens: Tokens = this.tokensService.getTokens();
    return this.tokensService.hasTokenExpired(tokens.access);
  }

  public hasRefreshTokenExpired(): boolean {
    const tokens: Tokens = this.tokensService.getTokens();
    return this.tokensService.hasTokenExpired(tokens.refresh);
  }

}
