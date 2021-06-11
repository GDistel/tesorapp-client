import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagedResponse } from 'src/app/shared';
import { ExpensesList } from '../expenses-lists/interfaces';
import { Expense } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExpensesListApiService {

  constructor(private http: HttpClient) { }

  getExpenses(expensesListId: string): Promise<PagedResponse<Expense[]>> {
    const params = { page: 1, limit: 10 };
    return this.http.get<PagedResponse<Expense[]>>(
      `${environment.apiUrl}/expenses-list/${expensesListId}/expenses`, { params }
    ).toPromise();
  }

  deleteExpense(id: number): Promise<void> {
    return this.http.delete<void>(`${environment.apiUrl}/expense/${id}`).toPromise();
  }
}
