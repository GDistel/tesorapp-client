import { Injectable } from '@angular/core';
import { Tokens } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class TokensService {
  private _storageKey = 'tesorapp-tokens';
  public tokens: Tokens | null = null;

  constructor() {
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

}
