import { Participant } from '../expenses-list/interfaces';
import { Currencies, ExpensesListStatus } from './enums';

export interface ExpensesList {
  id: number,
  name: string,
  description: string,
  status: ExpensesListStatus,
  currency: Currencies,
  userId: number,
  participants?: Participant[]
}

export interface CreateExpensesListRequest {
  name: string,
  description: string,
  currency: Currencies
}

export interface AddExpensesListParticipantRequest {
  name: string;
  linkToUserId?: number;
  listId: number;
}
