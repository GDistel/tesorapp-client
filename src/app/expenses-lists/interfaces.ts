import { Currencies, ExpensesListStatus } from './enums';

export interface ExpensesList {
  id: number,
  name: string,
  description: string,
  status: ExpensesListStatus,
  currency: Currencies,
  userId: number
}
