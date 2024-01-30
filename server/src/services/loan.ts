import { Types } from "mongoose";
import BaseService from "../base/services";
import type { ILoan } from "../interfaces/loan";
import loan from "../models/loan";
import { DbOpts, LoanUnit } from "../interfaces";
import helpers from "../helpers";

export default new (class LoanService extends BaseService<ILoan> {
  constructor() {
    super(loan);
  }

  public async findEmployeeProcessedLoan(employeeId: Types.ObjectId) {
    return await this.model.findOne({ employeeId, status: "Process" });
  }

  public async createLoan(
    employeeId: Types.ObjectId,
    {
      amount,
      unit,
      date,
      description,
      period,
    }: {
      amount: number;
      unit: LoanUnit;
      date: Date;
      description: string;
      period: number;
    },
    DbOpts?: DbOpts
  ) {
    return await this.createOneData(
      {
        amount,
        installment: helpers.countInstallment(
          amount,
          period,
          amount * (1 / 100)
        ),
        date,
        unit,
        description,
        employeeId,
        period,
      },
      DbOpts
    );
  }
})();
