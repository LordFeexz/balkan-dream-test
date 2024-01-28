import { Types } from "mongoose";
import type { LoanUnit } from ".";
import type { BaseDocument } from "../base/model";

export interface IPenalty extends BaseDocument {
  amount: number;
  date: Date;
  unit: LoanUnit;
  description: string;
  employeeId: Types.ObjectId;
  loanId: Types.ObjectId;
}
