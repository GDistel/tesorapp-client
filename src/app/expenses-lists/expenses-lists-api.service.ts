import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExpensesList } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExpensesListsApiService {
  constructor(
    private http: HttpClient
  ) { }

  getExpensesLists(): Promise<ExpensesList[]> {
    const params = { page: 1, limit: 10 };
    return this.http.get<ExpensesList[]>(`${environment.apiUrl}/expenses-list`, { params }).toPromise();
  }
}
