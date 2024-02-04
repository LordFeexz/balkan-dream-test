import type { BaseDocument, LoanUnit } from ".";

export interface IPenalty extends BaseDocument {
  amount: number;
  date: string;
  unit: LoanUnit;
  description: string;
  employeeId: string;
  isPayed: boolean;
}
