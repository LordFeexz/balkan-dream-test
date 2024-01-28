import { Schema } from "mongoose";
import BaseModel from "../base/model";
import type { IEmployee } from "../interfaces/employee";

export default new (class Employee extends BaseModel<IEmployee> {
  constructor() {
    super(
      "Employee",
      new Schema({
        name: {
          type: String,
          required: true,
        },
        surname: {
          type: String,
          required: true,
        },
        JBMG: {
          type: String,
          required: true,
          unique: true,
        },
        birthDate: {
          type: Date,
          required: true,
        },
        gender: {
          type: String,
          enum: ["M", "F"],
          required: true,
        },
        position: {
          type: String,
          required: true,
        },
        isPayoneer: {
          type: Boolean,
          default: false,
        },
      })
    );
  }
})().model;
