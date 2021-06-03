import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";
import { Tokens } from "./interfaces";
import { TokensService } from "./tokens.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  public tokenRefreshInProgress = false;
  private refreshAccessTokenSubject = new BehaviorSubject<Tokens | null>(null);

  constructor(private tokensService: TokensService) { }

  public refreshAccessToken(): Observable<Tokens>{
    return this.tokensService.doRefreshToken().pipe(
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
    return this.tokensService.hasAccessTokenExpired() && !this.tokenRefreshInProgress;
  }

  public hasToWaitForRefresh(): boolean{
    return this.tokensService.hasAccessTokenExpired() && this.tokenRefreshInProgress;
  }

}
