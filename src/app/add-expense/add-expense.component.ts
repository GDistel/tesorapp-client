import { TopNavService } from './../core/top-nav/top-nav.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  constructor(
    private topNavSvc: TopNavService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const listId = this.route.snapshot.params.id;
    this.topNavSvc.getTopNavBackLinkSubject().next(`/expenses-list/${listId}`);
  }

}
