import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TokensService } from 'src/app/auth/tokens.service';
import { TopNavService } from './../core/top-nav/top-nav.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  username!: string;

  constructor(
    private topNavSvc: TopNavService, private tokensSvc: TokensService,
    private authSvc: AuthService, private location: Location
  ) { }

  ngOnInit(): void {
    this.topNavSvc.getTopNavTitleSubject().next('My Account');
    this.username = this.tokensSvc.accessTokenPayload?.username;
  }

  signOut(): void {
    this.authSvc.signOut();
  }

  back(): void {
    this.location.back();
  }

}
