import { Component, OnInit } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { AuthContext, AuthRequest } from './interfaces';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authRequest!: AuthRequest;

  constructor(private authApiSvc: AuthApiService) { }

  ngOnInit(): void {
    this.authRequest = {
      context: AuthContext.login,
      username: '',
      password: '',
      remember: false
    };
  }

  async onLogin(): Promise<void> {
    const response = await this.authApiSvc.getTokens(this.authRequest);
  }

}
