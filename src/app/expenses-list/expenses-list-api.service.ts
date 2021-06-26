import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagedRequest, PagedResponse } from 'src/app/shared';
import { Participant, Expense, CreateExpenseRequest, ExpensesListResolution } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExpensesListApiService {

  constructor(private http: HttpClient) { }

  getExpensesListResolution(listId: number): Promise<ExpensesListResolution> {
    return this.http.get<ExpensesListResolution>(
      `${environment.apiUrl}/expenses-list/${listId}/resolve`
    ).toPromise();
  }

  getExpenses(expensesListId: string, pagedRequest?: PagedRequest): Promise<PagedResponse<Expense[]>> {
    const params = { page: pagedRequest?.page ?? 1, limit: pagedRequest?.limit ?? 10 };
    return this.http.get<PagedResponse<Expense[]>>(
      `${environment.apiUrl}/expenses-list/${expensesListId}/expenses`, { params }
    ).toPromise();
  }

  getExpense(expenseId: string): Promise<Expense> {
    return this.http.get<Expense>(`${environment.apiUrl}/expense/${expenseId}`).toPromise();
  }

  updateExpense(req: Partial<CreateExpenseRequest>, expenseId: number): Promise<Expense> {
    return this.http.patch<Expense>(`${environment.apiUrl}/expense/${expenseId}`, req).toPromise();
  }

  createExpense(req: CreateExpenseRequest): Promise<Expense> {
    return this.http.post<Expense>(
      `${environment.apiUrl}/expenses-list/${req.expensesListId}/expenses`, req
    ).toPromise();
  }

  deleteExpense(id: number): Promise<void> {
    return this.http.delete<void>(`${environment.apiUrl}/expense/${id}`).toPromise();
  }

  getExpensesListParticipants(listId: number): Promise<Participant[]> {
    return this.http.get<Participant[]>(`${environment.apiUrl}/expenses-list/${listId}/participants`).toPromise();
  }
}
