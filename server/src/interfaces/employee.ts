import type { Gender } from ".";
import type { BaseDocument } from "../base/model";
import { IBonus } from "./bonus";
import type { ILoan } from "./loan";
import type { ILoanPayment } from "./loanPayment";
import type { IPenalty } from "./penalty";
import type { ISalary } from "./salary";

export type IEmployee = BaseDocument & Employee;

export interface Employee {
  name: string;
  surname: string;
  JMBG: string;
  birthdate: Date;
  gender: Gender;
  position: string;
  isPayoneer: boolean;
  startdate: Date;
  enddate?: Date;
  getByIdentifier: (identifier: string) => Promise<Employee | null>;
}

export interface NewEmployeeProps {
  salaryAmount: number;
  name: string;
  surname: string;
  JMBG: string;
  birthdate: Date;
  gender: Gender;
  position: string;
  isPayoneer: boolean;
  startdate: Date;
}

export type EmployeeDetail = IEmployee & {
  salary: ISalary;
  loans: ILoan[];
  loanPayments: ILoanPayment[];
  bonuses: IBonus[];
  penalties: IPenalty[];
};
