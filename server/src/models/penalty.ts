import { Schema } from "mongoose";
import BaseModel from "../base/model";
import type { IPenalty } from "../interfaces/penalty";

export default new (class Penalty extends BaseModel<IPenalty> {
  constructor() {
    super(
      "Penalty",
      new Schema({
        amount: {
          type: Number,
          required: true,
        },
        date: {
          // i assume we can do early payment
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
        loanId: {
          type: Schema.ObjectId,
          required: true,
          ref: "Loan",
        },
        unit: {
          type: String,
          required: true,
          enum: ["BAM", "$"],
          default: "BAM",
        },
      })
    );
  }
})().model;
