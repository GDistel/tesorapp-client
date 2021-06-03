import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApiService } from 'src/app/auth/auth-api.service';
import { DecodedTokenPayload, Tokens } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class TokensService {
  private _storageKey = 'tesorapp-tokens';
  public tokens: Tokens | null = null;
  public accessTokenPayload!: DecodedTokenPayload;
  public refreshTokenPayload!: DecodedTokenPayload;

  constructor(private authApiSvc: AuthApiService) {
    const remember = this.rememberTokens();
    const tokens = this.getTokensFromStorage() as Tokens;
    this.setTokens(tokens, remember);
  }

  private get currentTimestamp(): number {
    return Math.floor((new Date).getTime() / 1000);
  }

  public setTokens(tokens: Tokens | null, remember?: boolean): void {
    this.tokens = tokens;
    this.setTokensPayloads(tokens as Tokens);
    sessionStorage.removeItem(this._storageKey);
    localStorage.removeItem(this._storageKey);
    if (!tokens) {
      return;
    }
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this._storageKey, JSON.stringify(tokens));
  }

  private setTokensPayloads(tokens: Tokens): void {
    if (!tokens) {
      return;
    }
    this.accessTokenPayload = this.decodeTokenPayload(tokens.access);
    this.refreshTokenPayload = this.decodeTokenPayload(tokens.refresh);
  }

  public getTokensFromStorage(): Tokens | undefined {
    const stringTokens = sessionStorage.getItem(this._storageKey) || localStorage.removeItem(this._storageKey);
    if (!stringTokens) {
      this.tokens = null;
      return;
    }
    const tokens: Tokens = JSON.parse(stringTokens as string);
    return tokens;
  }

  public doRefreshToken(): Observable<Tokens> {
    const tokens = this.getTokensFromStorage() as Tokens;
    return this.authApiSvc.refreshToken(tokens?.refresh);
  }

  public hasAccessTokenExpired(): boolean {
    return this.currentTimestamp >= this.accessTokenPayload.exp;
  }

  public hasRefreshTokenExpired(): boolean {
    return this.currentTimestamp >= this.refreshTokenPayload.exp;
  }

  private decodeTokenPayload(token: string): DecodedTokenPayload {
    const [encodedHeader, encodedPayload, encodedSignature]: string[] = token.split('.');
    return JSON.parse(atob(encodedPayload));
  }

  public isAuthenticated(): boolean {
    return !!this.tokens;
  }

  public rememberTokens(): boolean {
    return !!localStorage.getItem(this._storageKey);
  }

}
