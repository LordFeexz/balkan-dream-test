import type { BaseDocument, LoanStatus, LoanUnit } from ".";

export interface ILoan extends BaseDocument {
  amount: number;
  installment: number;
  date: Date;
  description: string;
  unit: LoanUnit;
  employeeId: string;
  status: LoanStatus;
  period: number;
}

export interface CreateLoanProps {
  amount: number;
  date: string;
  description: string;
  unit: LoanUnit;
  period: number;
  note?: string;
}

export interface CreateLoanPaymentProps {
  amount: number;
  date: string;
  description: string;
  unit: LoanUnit;
}
