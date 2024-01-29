import { Types } from "mongoose";
import type { BaseDocument } from "../base/model";

export interface ISalary extends BaseDocument {
  amount: number;
  date: Date;
  description: string;
  employeeId: Types.ObjectId;
  historyRaises: HistoryRaises[];
}

export interface HistoryRaises {
  amount: number;
  date: Date;
}
