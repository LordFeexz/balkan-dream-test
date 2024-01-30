import type { Gender } from ".";
import type { BaseDocument } from "../base/model";
import type { ILoan } from "./loan";
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
  firingdate?: Date;
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
};
