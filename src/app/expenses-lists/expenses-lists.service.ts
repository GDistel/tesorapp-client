import { ExpensesListsApiService } from './expenses-lists-api.service';
import { Injectable } from '@angular/core';
import { AddExpensesListParticipantRequest, CreateExpensesListRequest, ExpensesList } from './interfaces';
import { BottomNavAction, PagedResponse } from 'src/app/shared';
import { Subject } from 'rxjs';
import { ExpensesListsAction } from './enums';


@Injectable({
  providedIn: 'root'
})
export class ExpensesListsService {

  constructor(private expensesListsApiSvc: ExpensesListsApiService) { }

  createExpensesList(req: CreateExpensesListRequest): Promise<ExpensesList> {
    return this.expensesListsApiSvc.createExpensesList(req);
  }

  addExpensesListParticipant(req: AddExpensesListParticipantRequest): Promise<void> {
    return this.expensesListsApiSvc.addExpensesListParticipant(req);
  }

  getExpensesLists(): Promise<PagedResponse<ExpensesList[]>> {
    return this.expensesListsApiSvc.getExpensesLists();
  }

  getExpensesList(id: string): Promise<ExpensesList> {
    return this.expensesListsApiSvc.getExpensesList(id);
  }

  getNavActions(): BottomNavAction[] {
    return [
      { id: ExpensesListsAction.delete, icon: 'flash_on', activeIcon: 'clear' },
      { id: ExpensesListsAction.add, icon: 'add' },
    ];
  }

  deleteExpensesList(id: number): Promise<void> {
    return this.expensesListsApiSvc.deleteExpensesList(id);
  }
}
