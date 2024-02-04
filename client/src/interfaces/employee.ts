import type { BaseDocument, Gender } from ".";
import type { IBonus } from "./bonus";
import type { ILoan } from "./loan";
import type { ILoanPayment } from "./loanPayment";
import type { IPenalty } from "./penalty";
import type { ISalary } from "./salary";

export interface Employee extends BaseDocument {
  _id: string;
  name: string;
  surname: string;
  JMBG: string;
  birthdate: string;
  gender: Gender;
  position: string;
  isPayoneer: boolean;
  startdate: string;
  enddate?: string;
}

export type EmployeeDetail = Employee & {
  salary: ISalary;
  loans: ILoan[];
  loanPayments: ILoanPayment[];
  bonuses: IBonus[];
  penalties: IPenalty[];
};

export interface GetListEmployee {
  employees: EmployeeDetail[];
  totalData: number;
  totalPage: number;
}

export interface AddEmployeeState {
  name: string;
  surname: string;
  JMBG: string;
  birthdate: string;
  gender: string;
  position: string;
  startdate: string;
  isPayoneer: boolean;
  salaryAmount: number;
}
