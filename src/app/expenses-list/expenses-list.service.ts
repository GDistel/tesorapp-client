import { PagedRequest } from './../shared/interfaces';
import { ExpensesListApiService } from './expenses-list-api.service';
import { Injectable } from '@angular/core';
import { BottomNavAction, PagedResponse } from '../shared';
import { Expense, CreateExpenseRequest, ExpensesListResolution } from './interfaces';
import { ExpensesListAction } from './enums';
import { Participant } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExpensesListService {

  constructor(private expensesListApiSvc: ExpensesListApiService) { }

  getExpensesListResolution(listId: number): Promise<ExpensesListResolution> {
    return this.expensesListApiSvc.getExpensesListResolution(listId);
  }

  getExpensesListParticipants(listId: number): Promise<Participant[]> {
    return this.expensesListApiSvc.getExpensesListParticipants(listId);
  }

  createExpense(req: CreateExpenseRequest): Promise<Expense> {
    return this.expensesListApiSvc.createExpense(req);
  }

  deleteExpense(id: number): Promise<void> {
    return this.expensesListApiSvc.deleteExpense(id);
  }

  getExpenses(expensesListId: string, pagedRequest?: PagedRequest): Promise<PagedResponse<Expense[]>> {
    return this.expensesListApiSvc.getExpenses(expensesListId, pagedRequest);
  }

  getExpense(expenseId: string): Promise<Expense> {
    return this.expensesListApiSvc.getExpense(expenseId);
  }

  updateExpense(req: Partial<CreateExpenseRequest>, expenseId: number): Promise<Expense> {
    return this.expensesListApiSvc.updateExpense(req, expenseId);
  }

  getNavActions(): BottomNavAction[] {
    return [
      { id: ExpensesListAction.delete, icon: 'flash_on', activeIcon: 'clear' },
      { id: ExpensesListAction.listDetails, icon: 'visibility' },
      { id: ExpensesListAction.add, icon: 'add' }
    ];
  }
}
