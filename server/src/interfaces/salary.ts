import { Types } from "mongoose";
import type { BaseDocument } from "../base/model";

export interface ISalary extends BaseDocument {
  amount: number;
  date: Date;
  description: string;
  employeeId: Types.ObjectId;
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

export interface UpdateSalaryProps {
  amount: number;
  description: string;
}
