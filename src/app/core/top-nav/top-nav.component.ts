import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TopNavService } from './top-nav.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  private topNavTitleSubscription!: Subscription;
  private topNavBackLinkSubscription!: Subscription;
  public pageTitle = 'Tesorapp';
  public backLink!: string | null;
  public username!: string;

  constructor(private topNavSvc: TopNavService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.setUser();
    this.topNavTitleSubscription = this.topNavSvc.getTopNavTitleSubject()
      .pipe(tap(_ => this.setUser()))
      .subscribe(title => this.pageTitle = title as string);
    this.topNavBackLinkSubscription = this.topNavSvc.getTopNavBackLinkSubject()
      .subscribe(link => this.backLink = link);
  }

  setUser(): void {
    this.username = this.authSvc.getUser();
  }

  onSignOut(): void {
    this.authSvc.signOut();
  }

  ngOnDestroy(): void {
    this.topNavTitleSubscription.unsubscribe();
    this.topNavBackLinkSubscription.unsubscribe();
  }

}
