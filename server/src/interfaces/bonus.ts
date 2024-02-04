import { Types } from "mongoose";
import type { BaseDocument } from "../base/model";
import type { LoanUnit } from ".";

export interface IBonus extends BaseDocument {
  amount: number;
  date: Date;
  description: string;
  isRepeating: boolean;
  employeeId: Types.ObjectId;
  unit: LoanUnit;
}
