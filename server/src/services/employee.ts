import { isValidObjectId, Types } from "mongoose";
import BaseService from "../base/services";
import type { IEmployee, NewEmployeeProps } from "../interfaces/employee";
import employee from "../models/employee";
import type { DbOpts, Gender } from "../interfaces";

export default new (class Employee extends BaseService<IEmployee> {
  constructor() {
    super(employee);
  }

  public async getByIdentifier(identifier: string) {
    const condition: any[] = [{ JMBG: identifier }];
    if (isValidObjectId(identifier))
      condition.push({ _id: new Types.ObjectId(identifier) });

    return (await this.model.findOne({ $or: condition })) as IEmployee | null;
  }

  public async createEmployee(
    payload: {
      name: string;
      surname: string;
      JMBG: string;
      birthdate: Date;
      gender: Gender;
      position: string;
      isPayoneer: boolean;
      startdate: Date;
    },
    DbOpts?: DbOpts
  ) {
    return await this.createOneData(payload, DbOpts);
  }

  public async createManyEmployee(data: NewEmployeeProps[], DbOpts?: DbOpts) {
    return await this.createMany(data, DbOpts);
  }
})();
