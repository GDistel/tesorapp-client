import { ExpensesListService } from './expenses-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpensesListsService } from './../expenses-lists/expenses-lists.service';
import { TopNavService } from './../core/top-nav/top-nav.service';
import { ExpensesList } from '../expenses-lists/interfaces';
import { Expense } from './interfaces';


@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expensesList!: ExpensesList;
  expenses!: Expense[];

  constructor(
    private topNavSvc: TopNavService,
    private route: ActivatedRoute,
    private expensesListsSvc: ExpensesListsService,
    private expensesListSvc: ExpensesListService
  ) { }

  async ngOnInit(): Promise<void> {
    this.topNavSvc.getTopNavBackLinkSubject().next('/expenses-lists');
    const expensesListId = this.route.snapshot.params.id;
    this.expensesList = await this.expensesListsSvc.getExpensesList(expensesListId);
    this.topNavSvc.getTopNavTitleSubject().next(`${this.expensesList?.name} - ${this.expensesList?.currency}`);
    this.expenses = (await this.expensesListSvc.getExpenses(expensesListId)).items;
  }

}
