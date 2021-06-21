import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddExpensesListParticipantRequest, CreateExpensesListRequest, ExpensesList } from './interfaces';
import { PagedRequest, PagedResponse } from 'src/app/shared';


@Injectable({
  providedIn: 'root'
})
export class ExpensesListsApiService {
  constructor(
    private http: HttpClient
  ) { }

  addExpensesListParticipant(req: AddExpensesListParticipantRequest): Promise<void> {
    return this.http.post<void>(
      `${environment.apiUrl}/expenses-list/${req.listId}/participants`, { name: req.name }
    ).toPromise();
  }

  createExpensesList(req: CreateExpensesListRequest): Promise<ExpensesList> {
    return this.http.post<ExpensesList>(`${environment.apiUrl}/expenses-list`, req).toPromise();
  }

  getExpensesLists(pagedRequest?: PagedRequest): Promise<PagedResponse<ExpensesList[]>> {
    const params = { page: pagedRequest?.page ?? 1, limit: pagedRequest?.limit ?? 10 };
    return this.http.get<PagedResponse<ExpensesList[]>>(`${environment.apiUrl}/expenses-list`, { params }).toPromise();
  }

  getExpensesList(id: string): Promise<ExpensesList> {
    return this.http.get<ExpensesList>(`${environment.apiUrl}/expenses-list/${id}`).toPromise();
  }

  updateExpensesList(req: CreateExpensesListRequest, id: string): Promise<ExpensesList> {
    return this.http.patch<ExpensesList>(`${environment.apiUrl}/expenses-list/${id}`, req).toPromise();
  }

  deleteExpensesList(id: number): Promise<void> {
    return this.http.delete<void>(`${environment.apiUrl}/expenses-list/${id}`).toPromise();
  }
}
