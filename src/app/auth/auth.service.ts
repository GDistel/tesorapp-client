import { AuthApiService } from './auth-api.service';
import { Injectable } from '@angular/core';
import { TokensService } from './tokens.service';
import { AuthRequest, Tokens } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokensSvc: TokensService,
    private authApiSvc: AuthApiService
  ) { }

  public async signIn(authRequest: AuthRequest): Promise<boolean> {
    try {
      const tokens = await this.authApiSvc.signIn(authRequest);
      this.tokensSvc.setTokens(tokens);
      return true;
    } catch (error) {
        console.error(error);
    }
    return false;
  }

  public signOut(): void {
    this.tokensSvc.setTokens(null);
  }
}
