import { Types } from "mongoose";
import type { LoanStatus, LoanUnit } from ".";
import type { BaseDocument } from "../base/model";

export interface ILoan extends BaseDocument {
  amount: number;
  installment: number;
  date: Date;
  description: string;
  unit: LoanUnit;
  employeeId: Types.ObjectId;
  status: LoanStatus;
  period: number;
}

export interface CreateLoanProps {
  amount: number;
  date: Date;
  description: string;
  unit: LoanUnit;
  employeeId: string;
  period: number;
  note?: string;
}
