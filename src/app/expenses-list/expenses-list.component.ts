import { ExpensesListService } from './expenses-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesListsService } from './../expenses-lists/expenses-lists.service';
import { TopNavService } from './../core/top-nav/top-nav.service';
import { ExpensesList } from '../expenses-lists/interfaces';
import { Expense } from './interfaces';
import { IListItem } from '../shared';


@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expensesList!: ExpensesList;
  expenses!: Expense[];
  listItems!: IListItem[];

  constructor(
    private topNavSvc: TopNavService,
    private route: ActivatedRoute,
    private router: Router,
    private expensesListsSvc: ExpensesListsService,
    private expensesListSvc: ExpensesListService
  ) { }

  async ngOnInit(): Promise<void> {
    this.topNavSvc.getTopNavBackLinkSubject().next('/expenses-lists');
    const expensesListId = this.route.snapshot.params.id;
    this.expensesList = await this.expensesListsSvc.getExpensesList(expensesListId);
    this.topNavSvc.getTopNavTitleSubject().next(this.expensesList?.name);
    this.expenses = (await this.expensesListSvc.getExpenses(expensesListId)).items;
    this.listItems = this.expenses.map(expense => ({
      id: expense.id,
      name: expense.name,
      description: `${expense.amount} ${this.expensesList.currency} - ${(new Date(expense.date)).toLocaleDateString()}`,
      icon: 'receipt_long'
    }));
  }

  onListItemClicked(listItem: IListItem): void {
    // this.router.navigate(['/', 'expenses-list', listItem.id]);
  }

  onAddNewExpense(): void {
    console.log('Add new expense btn clicked')
  }

}
