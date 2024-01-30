import { Types } from "mongoose";
import BaseService from "../base/services";
import type { DbOpts } from "../interfaces";
import type {
  HistoryRaises,
  ISalary,
  PaymentHistory,
} from "../interfaces/salary";
import salary from "../models/salary";

export default new (class SalaryService extends BaseService<ISalary> {
  constructor() {
    super(salary);
  }

  public async updateData(
    employeeId: Types.ObjectId,
    data: { amount: number; description: string; previousSalary: number },
    opts?: DbOpts
  ) {
    const now = new Date();
    return await this.model.updateOne(
      { employeeId },
      {
        $set: {
          ...data,
          date: now,
        },
        $push: {
          historyRaises: {
            amount: data.previousSalary,
            lastChange: now,
          },
        },
      },
      { ...opts }
    );
  }

  public async findEmployeeSalary(employeeId: Types.ObjectId) {
    return (await this.model.findOne({ employeeId })) as ISalary | null;
  }

  public async createSalary(
    {
      date,
      amount,
      employeeId,
    }: {
      date: Date;
      amount: number;
      employeeId: Types.ObjectId;
    },
    DbOpts?: DbOpts
  ) {
    return await this.createOneData(
      {
        amount,
        date,
        description: "N/A",
        employeeId,
        historyRaises: [] as HistoryRaises[],
        paymentHistory: [] as PaymentHistory[],
      },
      DbOpts
    );
  }

  public async createManySalary(data: ISalary[], dbOpts?: DbOpts) {
    return await this.createMany(data, dbOpts);
  }
})();
