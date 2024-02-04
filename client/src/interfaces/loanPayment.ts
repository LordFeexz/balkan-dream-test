import type { BaseDocument, LoanUnit } from ".";

export interface ILoanPayment extends BaseDocument {
  amount: number;
  date: Date;
  description: string;
  employeeId: string;
  loanId: string;
  unit: LoanUnit;
}
