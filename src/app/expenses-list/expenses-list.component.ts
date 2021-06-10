import { ExpensesListService } from './expenses-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesListsService } from './../expenses-lists/expenses-lists.service';
import { TopNavService } from './../core/top-nav/top-nav.service';
import { ExpensesList } from '../expenses-lists/interfaces';
import { Expense } from './interfaces';
import { BottomNavAction, IListItem } from '../shared';
import { ExpensesListAction } from './enums';


@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expensesList!: ExpensesList;
  expenses!: Expense[];
  listItems!: IListItem[];
  bottomNavActions!: BottomNavAction[];

  constructor(
    private topNavSvc: TopNavService,
    private route: ActivatedRoute,
    private router: Router,
    private expensesListsSvc: ExpensesListsService,
    private expensesListSvc: ExpensesListService
  ) { }

  async ngOnInit(): Promise<void> {
    this.bottomNavActions = this.expensesListSvc.getNavActions();
    this.topNavSvc.getTopNavBackLinkSubject().next('/expenses-lists');
    const expensesListId = this.route.snapshot.params.id;
    this.expensesList = await this.expensesListsSvc.getExpensesList(expensesListId);
    this.topNavSvc.getTopNavTitleSubject().next(this.expensesList?.name);
    this.expenses = (await this.expensesListSvc.getExpenses(expensesListId)).items;
    this.listItems = this.expenses.map(expense => ({
      id: expense.id,
      name: expense.name,
      description: `${this.expensesList.currency} ${expense.amount} - ${(new Date(expense.date)).toLocaleDateString()}`,
      icon: 'receipt_long'
    }));
  }

  onListItemClicked(listItem: IListItem): void {
    // this.router.navigate(['/', 'expenses-list', listItem.id]);
  }

  onBottomNavActionClicked(id: ExpensesListAction): void {
    if (id === ExpensesListAction.add) {
      this.router.navigate(['/', 'expenses-list', this.expensesList.id, 'add-expense']);
    }
  }

}
