import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces';
import { AuthContext } from './enums';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authRequest!: AuthRequest;
  signInError = false;
  loading = false;
  showWaitMessage = false;

  constructor(
    private authSvc: AuthService, private router: Router, private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    const refreshToken = this.activatedRoute.snapshot.queryParams.refreshToken;
    if (refreshToken) {
      this.loading = true;
      this.authSvc.signInWithRefreshToken(refreshToken).pipe(first()).subscribe({
        next: () => this.router.navigate(['']),
        error: () => this.signInError
      });
    }
    this.authRequest = {
      context: AuthContext.signIn,
      username: '',
      password: '',
      remember: true
    };
  }

  async onSignin(): Promise<void> {
    this.loading = true;
    setTimeout(() => this.showWaitMessage = true, 3500);
    const signedIn = await this.authSvc.signIn(this.authRequest);
    if (!signedIn) {
      this.signInError = true;
      return;
    }
    this.loading = false;
    this.router.navigate(['']);
  }

}
