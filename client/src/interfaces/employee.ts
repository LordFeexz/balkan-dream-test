import type { Gender } from ".";

export interface Employee {
  _id: string;
  name: string;
  surname: string;
  JMBG: string;
  birthdate: Date;
  gender: Gender;
  position: string;
  isPayoneer: boolean;
  startdate: Date;
  enddate?: Date;
}

export interface GetListEmployee {
  employees: Employee[];
  totalData: number;
  totalPage: number;
}
