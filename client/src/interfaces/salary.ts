import type { BaseDocument } from ".";

export interface ISalary extends BaseDocument {
  amount: number;
  date: Date;
  description: string;
  employeeId: string;
  historyRaises: HistoryRaises[];
  paymentHistory: PaymentHistory[];
}

export interface HistoryRaises {
  amount: number;
  lastChange: Date;
}

export interface PaymentHistory {
  amount: number;
  description: string;
  date: Date;
}
