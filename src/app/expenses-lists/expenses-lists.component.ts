import { ConfirmationDialogComponent } from './../shared/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TopNavService } from './../core/top-nav/top-nav.service';
import { BottomNavAction, IListItem } from './../shared';
import { ExpensesListsAction } from './enums';
import { ExpensesListsService } from './expenses-lists.service';
import { ExpensesList } from './interfaces';

@Component({
  selector: 'app-expenses-lists',
  templateUrl: './expenses-lists.component.html',
  styleUrls: ['./expenses-lists.component.scss']
})
export class ExpensesListsComponent implements OnInit {
  expensesLists!: ExpensesList[];
  listItems!: IListItem[];
  bottomNavActions!: BottomNavAction[];
  toggleDeleteAction = false;

  constructor(
    private router: Router,
    private topNavSvc: TopNavService,
    private expensesListsSvc: ExpensesListsService,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    this.bottomNavActions = this.expensesListsSvc.getNavActions();
    this.topNavSvc.getTopNavTitleSubject().next('Expenses lists');
    this.topNavSvc.getTopNavBackLinkSubject().next(null);
    await this.setExpensesLists();
  }

  async setExpensesLists(): Promise<void> {
    this.expensesLists = (await this.expensesListsSvc.getExpensesLists()).items;
    this.listItems = this.expensesLists.map(expensesList => ({
      id: expensesList.id,
      name: expensesList.name,
      description: expensesList.description,
      icon: 'list'
    }));
  }

  onListItemClicked(listItem: IListItem): void {
    this.router.navigate(['/', 'expenses-list', listItem.id]);
  }

  onBottomNavActionClicked(id: ExpensesListsAction): void {
    if (id === ExpensesListsAction.add) {
      this.router.navigate(['/', 'expenses-list-editor']);
    } else if (id === ExpensesListsAction.delete) {
      this.toggleDeleteAction = !this.toggleDeleteAction;
    }
  }

  async onItemActionClicked(listItem: IListItem): Promise<void> {
    const dialogBody = 'Are you sure that you want to delete the selected expenses list?';
    this.dialog.open(ConfirmationDialogComponent, { data: { title: 'Delete expenses list', body: dialogBody } })
      .afterClosed()
      .subscribe(async result => {
        if (!result) {
          return;
        }
        await this.expensesListsSvc.deleteExpensesList(listItem.id);
        await this.setExpensesLists();
      });
  }

}
