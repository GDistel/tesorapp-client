export interface Expense {
  id: number;
  name: string;
  amount: number;
  date: string;
  paidBy: number;
  type: string;
  expensesListId: number;
  userId: number;
  participantIds: number[];
}

export interface Participant {
  id: number;
  name: string;
}

export interface CreateExpenseRequest {
  name: string;
  amount: number;
  date: string;
  paidBy: number;
  participantIds: number[];
  expensesListId: number;
}

export interface ParticipantsDebtStatus {
  // the key is the participant id, the value is the participant's debt
  [key: number]: number;
}

export interface Settlement {
  payTo: string;
  amount: number;
}

export interface ParticipantsSettlements {
  // the key is the participant id
  [key: string]: Settlement[];
}

export interface ExpensesListResolution {
  status: ParticipantsDebtStatus;
  settle: ParticipantsSettlements;
}
