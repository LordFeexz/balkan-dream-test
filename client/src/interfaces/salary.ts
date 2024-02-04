import type { BaseDocument, LoanUnit } from ".";

export interface ISalary extends BaseDocument {
  amount: number;
  date: string;
  description: string;
  employeeId: string;
  historyRaises: HistoryRaises[];
  paymentHistory: PaymentHistory[];
}

export interface HistoryRaises {
  amount: number;
  lastChange: string;
  description: string;
  date: string;
  unit: LoanUnit;
}

export interface PaymentHistory {
  amount: number;
  description: string;
  date: string;
  unit: LoanUnit;
}
