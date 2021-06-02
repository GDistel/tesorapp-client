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

  constructor(private authSvc: AuthService, private expensesListsSvc: ExpensesListsService) { }

  async ngOnInit(): Promise<void> {
    this.expensesLists = await this.expensesListsSvc.getExpensesLists();
  }

  onSignOut(): void {
    this.authSvc.signOut();
  }

  async onRequestItems(): Promise<void> {
    this.expensesLists = await this.expensesListsSvc.getExpensesLists();
  }

}
