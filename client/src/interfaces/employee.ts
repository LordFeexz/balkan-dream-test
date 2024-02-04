import type { BaseDocument, Gender } from ".";
import type { ILoan } from "./loan";
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
