import type { Gender } from ".";
import type { BaseDocument } from "../base/model";

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
}
