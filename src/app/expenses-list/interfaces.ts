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
