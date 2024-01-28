import { Schema } from "mongoose";
import BaseModel from "../base/model";
import type { ILoan } from "../interfaces/loan";

export default new (class Loan extends BaseModel<ILoan> {
  constructor() {
    super(
      "Loan",
      new Schema({
        amount: {
          type: Number,
          required: true,
        },
        installment: {
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
        unit: {
          type: String,
          required: true,
          enum: ["BAM", "$"],
          default: "BAM",
        },
        employeeId: {
          type: Schema.ObjectId,
          required: true,
          ref: "Employee",
        },
      })
    );
  }
})().model;
