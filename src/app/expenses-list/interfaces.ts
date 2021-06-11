export interface Expense {
  id: number,
  name: string,
  amount: number,
  date: string,
  paidBy: number,
  type: string,
  expensesListId: number,
  userId: number,
  participantIds: number[]
}

export interface Participant {
  id: number;
  name: string;
}

export interface CreateExpenseRequest {
  name: string,
  amount: number,
  date: string,
  paidBy: number,
  participantIds: number[],
  expensesListId: number
}
