import { TopNavService } from './../core/top-nav/top-nav.service';
import { ExpensesListsService } from './expenses-lists.service';
import { Component, OnInit } from '@angular/core';
import { ExpensesList } from './interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses-lists',
  templateUrl: './expenses-lists.component.html',
  styleUrls: ['./expenses-lists.component.scss']
})
export class ExpensesListsComponent implements OnInit {
  expensesLists!: ExpensesList[];

  constructor(
    private router: Router,
    private topNavSvc: TopNavService,
    private expensesListsSvc: ExpensesListsService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.topNavSvc.getTopNavTitleSubject().next('Expenses lists');
    this.topNavSvc.getTopNavBackLinkSubject().next(null);
    this.expensesLists = (await this.expensesListsSvc.getExpensesLists()).items;
  }

  onListItemClicked(expensesList: ExpensesList): void {
    this.router.navigate(['/', 'expenses-list', expensesList.id]);
  }

}
