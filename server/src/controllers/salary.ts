import type { Request, Response, NextFunction } from "express";
import salaryValidation from "../validations/salary";
import AppError from "../base/error";
import employeeService from "../services/employee";
import salaryService from "../services/salary";
import response from "../middlewares/response";
import { Types } from "mongoose";

export default new (class SalaryController {
  public async raiseUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        amount,
        description,
      } = await salaryValidation.validateUpdateSalary(req.body);
      const { employeeId } = req.params;

      const employee = await employeeService.getByIdentifier(employeeId);
      if (!employee)
        throw new AppError({
          message: "employee not found",
          statusCode: 404,
        });

      const salary = await salaryService.findEmployeeSalary(employee._id);
      if (!salary)
        throw new AppError({
          message: "salary not found",
          statusCode: 404,
        });

      if (salary.amount > amount)
        throw new AppError({
          message: "new salary cannot lower than current salary",
          statusCode: 400,
        });

      response.createResponse({
        res,
        code: 200,
        message: "ok",
        data: await salaryService.updateData(employee._id, {
          amount,
          description,
          previousSalary: salary.amount,
        }),
      });
    } catch (err) {
      next(err);
    }
  }

  public async generateSalary(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { employeeId } = req.params;

      const employee = await employeeService.findEmployeeDetail(
        new Types.ObjectId(employeeId)
      );
      if (!employee)
        throw new AppError({
          message: "employee not found",
          statusCode: 404,
        });

      //todo penalty,loan payment

      response.createResponse({ res, code: 200, message: "success" });
    } catch (err) {
      next(err);
    }
  }
})();
