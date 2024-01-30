import { Types } from "mongoose";
import BaseService from "../base/services";
import { DbOpts } from "../interfaces";
import type { CreatePenaltyProps, IPenalty } from "../interfaces/penalty";
import penalty from "../models/penalty";

export default new (class PenaltyService extends BaseService<IPenalty> {
  constructor() {
    super(penalty);
  }

  public async createPenalty(
    employeeId: Types.ObjectId,
    data: CreatePenaltyProps,
    dbOpts?: DbOpts
  ) {
    return await this.createOneData(
      {
        ...data,
        employeeId,
      },
      dbOpts
    );
  }
})();
