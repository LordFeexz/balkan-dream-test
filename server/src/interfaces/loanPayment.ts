import { Types } from "mongoose";
import type { BaseDocument } from "../base/model";

export interface ILoanPayment extends BaseDocument {
  amount: number;
  date: Date;
  description: string;
  employeeId: Types.ObjectId;
  loanId: Types.ObjectId;
}
