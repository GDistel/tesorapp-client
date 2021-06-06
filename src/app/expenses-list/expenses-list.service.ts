import { ExpensesListApiService } from './expenses-list-api.service';
import { Injectable } from '@angular/core';
import { BottomNavAction, PagedResponse } from '../shared';
import { Expense } from './interfaces';
import { ExpensesListAction } from './enums';

@Injectable({
  providedIn: 'root'
})
export class ExpensesListService {

  constructor(private expensesListApiSvc: ExpensesListApiService) { }

  getExpenses(expensesListId: string): Promise<PagedResponse<Expense[]>> {
    return this.expensesListApiSvc.getExpenses(expensesListId);
  }

  getNavActions(): BottomNavAction[] {
    return [
      { id: ExpensesListAction.share, icon: 'share' },
      { id: ExpensesListAction.balance, icon: 'groups' },
      { id: ExpensesListAction.add, icon: 'add' }
    ];
  }
}
