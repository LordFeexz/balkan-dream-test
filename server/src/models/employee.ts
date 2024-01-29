import { Schema, Types, isValidObjectId } from "mongoose";
import BaseModel from "../base/model";
import type { IEmployee } from "../interfaces/employee";

export default new (class Employee extends BaseModel<IEmployee> {
  private static createSchema() {
    const schema = new Schema<IEmployee, any>({
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      JMBG: {
        type: String,
        required: true,
        unique: true,
      },
      birthdate: {
        type: Date,
        required: true,
      },
      startdate: {
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
      firingdate: {
        type: Date,
        required: false,
      },
    });
    schema.statics.getByIdentifier = async function (identifier: string) {
      const condition: any = [{ JMBG: identifier }];
      if (isValidObjectId(identifier))
        condition.push({ _id: new Types.ObjectId(identifier) });

      return await this.findOne({
        $or: condition,
      });
    };
    return schema;
  }
  constructor() {
    super("Employee", Employee.createSchema());
  }
})().model;
