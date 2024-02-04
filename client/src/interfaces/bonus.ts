import type { BaseDocument, LoanUnit } from ".";

export interface IBonus extends BaseDocument {
  amount: number;
  date: string;
  description: string;
  isRepeating: boolean;
  employeeId: string;
  unit: LoanUnit;
}
