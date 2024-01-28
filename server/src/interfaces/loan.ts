import { Types } from "mongoose";
import type { LoanUnit } from ".";
import type { BaseDocument } from "../base/model";

export interface ILoan extends BaseDocument {
  amount: number;
  installment: number;
  date: Date;
  description: string;
  unit: LoanUnit;
  employeeId: Types.ObjectId;
}
