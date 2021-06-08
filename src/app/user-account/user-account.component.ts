import { TopNavService } from './../core/top-nav/top-nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor(private topNavSvc: TopNavService) { }

  ngOnInit(): void {
    this.topNavSvc.getTopNavTitleSubject().next('My Account');
  }

}
