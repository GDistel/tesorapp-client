import { TopNavService } from './../core/top-nav/top-nav.service';
import { ExpensesListsService } from './expenses-lists.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ExpensesList } from './interfaces';

@Component({
  selector: 'app-expenses-lists',
  templateUrl: './expenses-lists.component.html',
  styleUrls: ['./expenses-lists.component.scss']
})
export class ExpensesListsComponent implements OnInit {
  expensesLists!: ExpensesList[];

  constructor(
    private topNavSvc: TopNavService,
    private expensesListsSvc: ExpensesListsService
  ) { }

  async ngOnInit(): Promise<void> {
    this.topNavSvc.getTopNavTitleSubject().next('Expenses lists');
    this.expensesLists = (await this.expensesListsSvc.getExpensesLists()).items;
  }

}
