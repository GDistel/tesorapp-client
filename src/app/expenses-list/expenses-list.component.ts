import { PagedRequest } from './../shared/interfaces';
import { PagedResponse } from 'src/app/shared';
import { ExpensesListService } from './expenses-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesListsService } from './../expenses-lists/expenses-lists.service';
import { TopNavService } from './../core/top-nav/top-nav.service';
import { ExpensesList } from '../expenses-lists/interfaces';
import { Expense } from './interfaces';
import { BottomNavAction, IListItem } from '../shared';
import { ExpensesListAction } from './enums';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expensesList!: ExpensesList;
  expensesResponse!: PagedResponse<Expense[]>;
  listItems!: IListItem[];
  bottomNavActions!: BottomNavAction[];
  toggleDeleteAction = false;
  canFetchMoreItems = true;

  constructor(
    private topNavSvc: TopNavService,
    private route: ActivatedRoute,
    private router: Router,
    private expensesListsSvc: ExpensesListsService,
    private expensesListSvc: ExpensesListService,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    this.bottomNavActions = this.expensesListSvc.getNavActions();
    this.topNavSvc.getTopNavBackLinkSubject().next('/expenses-lists');
    const expensesListId = this.route.snapshot.params.id;
    this.expensesList = await this.expensesListsSvc.getExpensesList(expensesListId);
    this.topNavSvc.getTopNavTitleSubject().next(this.expensesList?.name);
    await this.setExpenses();
  }

  async setExpenses(): Promise<void> {
    this.listItems = [];
    this.canFetchMoreItems = true;
    this.expensesResponse = await this.expensesListSvc.getExpenses(this.expensesList.id.toString());
    this.mapExpensesToListItems();
  }

  mapExpensesToListItems(): void {
    const newItems = this.expensesResponse.items.map(expense => ({
      id: expense.id,
      name: expense.name,
      description: `${this.expensesList.currency} ${expense.amount} - ${(new Date(expense.date)).toLocaleDateString()}`,
      icon: 'receipt_long'
    }));
    this.listItems = [...this.listItems, ...newItems];
  }

  onListItemClicked(listItem: IListItem): void {
    this.router.navigate(
      ['/', 'expenses-list', this.expensesList.id, 'expense'],
      { queryParams: { expenseId: listItem.id }}
    );
  }

  onBottomNavActionClicked(id: ExpensesListAction): void {
    if (id === ExpensesListAction.add) {
      this.router.navigate(['/', 'expenses-list', this.expensesList.id, 'expense']);
    } else if (id === ExpensesListAction.delete) {
      this.toggleDeleteAction = !this.toggleDeleteAction;
    } else if (id === ExpensesListAction.listDetails) {
      this.router.navigate(['/', 'expenses-list', this.expensesList.id, 'details']);
    }
  }

  async onItemActionClicked(listItem: IListItem): Promise<void> {
    const dialogBody = 'Are you sure that you want to delete the selected expense?';
    this.dialog.open(ConfirmationDialogComponent, { data: { title: 'Delete expense', body: dialogBody } })
      .afterClosed()
      .subscribe(async result => {
        if (!result) {
          return;
        }
        await this.expensesListSvc.deleteExpense(listItem.id);
        await this.setExpenses();
      });
  }

  async fetchMoreItems(): Promise<void> {
    if (this.expensesResponse.items.length < this.expensesResponse.limit) {
      // there wouldn't be any more items to fetch
      this.canFetchMoreItems = false;
      return;
    }
    const pagedRequest: PagedRequest = {
      page: ++this.expensesResponse.page,
      limit: this.expensesResponse.limit
    };
    this.expensesResponse = await this.expensesListSvc.getExpenses(this.expensesList.id.toString(), pagedRequest);
    if (this.expensesResponse.items.length) {
      this.mapExpensesToListItems();
    }
  }

}
