import type { Request, Response, NextFunction } from "express";
import employeeValidation from "../validations/employee";
import Employee from "../models/employee";
import response from "../middlewares/response";
import { Types } from "mongoose";
import AppError from "../base/error";

export default new (class EmployeeController {
  public async registerNewEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      response.createResponse({
        res,
        code: 201,
        message: "ok",
        data: await Employee.create(
          await employeeValidation.validateNewEmployee(req.body)
        ),
      });
    } catch (err) {
      next(err);
    }
  }

  public async registerBulkNewEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

      response.createResponse({
        res,
        code: 201,
        message: "ok",
        data: await Employee.insertMany(payload),
      });
    } catch (err) {
      next(err);
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
