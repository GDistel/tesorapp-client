import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopNavService } from './../core/top-nav/top-nav.service';
import { IListItem } from './../shared';
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

  constructor(
    private router: Router,
    private topNavSvc: TopNavService,
    private expensesListsSvc: ExpensesListsService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.topNavSvc.getTopNavTitleSubject().next('Expenses lists');
    this.topNavSvc.getTopNavBackLinkSubject().next(null);
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

  onAddNewExpensesList(): void {
    console.log('Add new expenses list btn clicked')
  }

}
