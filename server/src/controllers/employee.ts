import type { Request, Response, NextFunction } from "express";
import employeeValidation from "../validations/employee";
import Employee from "../models/employee";
import response from "../middlewares/response";
import { Types } from "mongoose";
import AppError from "../base/error";
import { startSession } from "mongoose";
import type { HistoryRaises, ISalary } from "../interfaces/salary";
import type { NewEmployeeProps } from "../interfaces/employee";
import Salary from "../models/salary";

export default new (class EmployeeController {
  public async registerNewEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const session = await startSession();
    session.startTransaction();
    try {
      const {
        salaryAmount,
        ...payload
      } = await employeeValidation.validateNewEmployee(req.body);

      const data = await Employee.create({ ...payload }, { session });
      await Salary.create(
        {
          amount: salaryAmount,
          date: payload.startdate,
          description: "N/A",
          employeeId: (data as any)._id,
          historyRaises: [] as HistoryRaises[],
        },
        { session }
      );

      await session.commitTransaction();
      response.createResponse({
        res,
        code: 201,
        message: "ok",
        data,
      });
    } catch (err) {
      await session.abortTransaction();
      next(err);
    } finally {
      await session.endSession();
    }
  }

  public async registerBulkNewEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const session = await startSession();
    session.startTransaction();
    try {
      const { datas } = await employeeValidation.validateBulkNewEmployee(
        req.body
      );

      const unique = datas.filter(
        (val, i, self) => i === self.findIndex((el) => el.JMBG === val.JMBG)
      );

      const employees = await Employee.find({
        JMBG: { $in: unique.map(({ JMBG }) => JMBG) },
      });

      const payload = unique.filter(
        (el) => !employees.some((employee) => employee.JMBG === el.JMBG)
      );
      if (!payload.length)
        throw new AppError({
          message: "there is no processed user,please check your user data",
          statusCode: 400,
        });

      const insertedData = await Employee.insertMany(payload, { session });
      const salaryPayload: ISalary[] = [];
      for (const data of insertedData) {
        const body = unique.find(
          (el) => el.JMBG === data.JMBG
        ) as NewEmployeeProps;

        salaryPayload.push({
          amount: body.salaryAmount,
          date: body.startdate,
          description: "N/A",
          employeeId: data._id,
          historyRaises: [] as HistoryRaises[],
        } as ISalary);
      }
      await Salary.insertMany(salaryPayload, { session });

      await session.commitTransaction();
      response.createResponse({
        res,
        code: 201,
        message: "ok",
        data: insertedData,
      });
    } catch (err) {
      await session.abortTransaction();
      next(err);
    } finally {
      await session.endSession();
    }
  }

  public async firedAEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { employeeId } = req.params;
      const employeeObjectId = new Types.ObjectId(employeeId);

      const employee = await Employee.findById(employeeObjectId);
      if (!employee)
        throw new AppError({
          message: "employee not found",
          statusCode: 404,
        });

      if (employee.firingdate)
        throw new AppError({
          message: "employee is already fired",
          statusCode: 409,
        });

      await Employee.updateOne(
        { _id: employeeObjectId },
        {
          $set: {
            firingdate: new Date(),
          },
        }
      );

      response.createResponse({ res, code: 200, message: "success" });
    } catch (err) {
      next(err);
    }
  }
})();
