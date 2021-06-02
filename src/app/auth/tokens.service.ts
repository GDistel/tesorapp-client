import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { DecodedTokenPayload, Tokens } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class TokensService {
  private _storageKey = 'tesorapp-tokens';
  public tokens: Tokens | null = null;

  constructor(private authApiSvc: AuthApiService) {
    const savedTokens = sessionStorage.getItem(this._storageKey) || localStorage.getItem(this._storageKey);
    if (savedTokens) {
      this.tokens = JSON.parse(savedTokens);
    }
  }

  public isAuthenticated(): boolean {
    return !!this.tokens;
  }

  public rememberTokens(): boolean {
    const localStorageCreds = localStorage.getItem(this._storageKey);
    return !!localStorageCreds;
  }

  public setTokens(tokens: Tokens | null, remember?: boolean): void {
    this.tokens = tokens;
    sessionStorage.removeItem(this._storageKey);
    localStorage.removeItem(this._storageKey);
    if (!tokens) {
      return;
    }
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this._storageKey, JSON.stringify(tokens));
  }

  public getTokens(): Tokens {
    const stringTokens = sessionStorage.getItem(this._storageKey) || localStorage.removeItem(this._storageKey);
    const tokens: Tokens = JSON.parse(stringTokens as string);
    return tokens;
  }

  public refreshToken(): Observable<Tokens> {
    const tokens: Tokens = this.getTokens();
    return this.authApiSvc.refreshToken(tokens.refresh);
  }

  public hasTokenExpired(token: string): boolean {
    const tokenPayload: DecodedTokenPayload = this.decodeTokenPayload(token);
    const expiryTimestamp = tokenPayload.exp;
    const currentTimestamp = Math.floor((new Date).getTime() / 1000);
    return currentTimestamp >= expiryTimestamp;
  }

  public decodeTokenPayload(token: string): DecodedTokenPayload {
    const [encodedHeader, encodedPayload, encodedSignature]: string[] = token.split('.');
    return JSON.parse(atob(encodedPayload));
  }

}
