import type { BaseDocument, LoanStatus, LoanUnit } from ".";
import type { Employee } from "./employee";
import type { ILoanNote } from "./loanNote";

export interface ILoan extends BaseDocument {
  amount: number;
  installment: number;
  date: Date;
  description: string;
  unit: LoanUnit;
  employeeId: string;
  status: LoanStatus;
  period: number;
  paymentHistory: PaymentHistory[];
  note?: ILoanNote;
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

export type EmployeeLoan = ILoan & {
  employee: Employee;
};

export interface GetListEmployeeLoan {
  loans: EmployeeLoan[];
  totalData: number;
  totalPage: number;
}

export interface GetListSummaryEmployeeLoan {
  summaries: SummaryLoan[];
  totalData: number;
  totalPage: number;
}

export interface PaymentHistory {
  amount: number;
  date: Date;
  description: string;
  unit: LoanUnit;
}

export interface SummaryLoan {
  _id: string;
  surname: string;
  totalAmount: number;
  totalLoan: number;
  remainingDebt: number;
  remainingInstallment: number;
}

export interface CreateBulkLoanResp {
  success: number;
  failed: number;
  failedData: BulkLoanFailedData[];
  successData: EmployeeLoan[];
}

export type BulkLoanFailedData = {
  employeeId: string;
  reason: string;
} & CreateLoanProps;
