import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { AuthContext, AuthRequest } from './interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authRequest!: AuthRequest;
  signInError = false;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authRequest = {
      context: AuthContext.signIn,
      username: '',
      password: '',
      remember: false
    };
  }

  async onSignin(): Promise<void> {
    const signedIn = await this.authSvc.signIn(this.authRequest);
    if (!signedIn) {
      this.signInError = true;
      return;
    }
    this.router.navigate(['']);
  }

}
