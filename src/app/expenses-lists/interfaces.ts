import { Currencies, ExpensesListStatus } from './enums';

export interface ExpensesList {
  id: number,
  name: string,
  description: string,
  status: ExpensesListStatus,
  currency: Currencies,
  userId: number,
  expenses: any[],
  participants: any[]
}

export interface PagedResponse<T> {
  items: T;
  totalCount: number;
  page: number;
  limit: number;
}
