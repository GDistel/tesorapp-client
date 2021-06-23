import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces';
import { AuthContext } from './enums';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authRequest!: AuthRequest;
  signInError = false;
  loading = false;

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
