import { Schema } from "mongoose";
import BaseModel from "../base/model";
import type { ISalary } from "../interfaces/salary";

//first time i think its a salary payment model but i just realize,this is a salaryRaise model
export default new (class Salary extends BaseModel<ISalary> {
  constructor() {
    super(
      "Salary",
      new Schema({
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        description: {
          type: String,
          default: "N/A",
        },
        employeeId: {
          type: Schema.ObjectId,
          required: true,
          ref: "Employee",
        },
        historyRaises: [
          {
            amount: {
              type: Number,
              required: true,
            },
            date: {
              type: Date,
              required: true,
            },
          },
        ],
      })
    );
  }
})().model;
