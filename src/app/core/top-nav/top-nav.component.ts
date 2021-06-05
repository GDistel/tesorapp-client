import { TopNavService } from './top-nav.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  private topNavTitleSubscription!: Subscription;
  public title = 'Tesorapp';

  constructor(private topNavSvc: TopNavService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.topNavTitleSubscription = this.topNavSvc.getTopNavTitleSubject().subscribe({
      next: title => this.title = title
    });
  }

  onSignOut(): void {
    this.authSvc.signOut();
  }

  ngOnDestroy(): void {
    this.topNavTitleSubscription.unsubscribe();
  }

}
