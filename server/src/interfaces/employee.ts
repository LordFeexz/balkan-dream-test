import type { Gender } from ".";
import type { BaseDocument } from "../base/model";

export interface IEmployee extends BaseDocument {
  name: string;
  surname: string;
  JBMG: string;
  birthDate: Date;
  gender: Gender;
  position: string;
  isPayoneer: boolean;
}
