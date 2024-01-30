import type { Request, Response, NextFunction } from "express";
import salaryValidation from "../validations/salary";
import AppError from "../base/error";
import Salary from "../models/salary";
import employeeService from "../services/employee";
import salaryService from "../services/salary";
import response from "../middlewares/response";

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
        employeeId,
      } = await salaryValidation.validateUpdateSalary(req.body);

      const employee = await employeeService.getByIdentifier(employeeId);
      if (!employee)
        throw new AppError({
          message: "employee not found",
          statusCode: 404,
        });

      const salary = await Salary.findOne({
        employeeId: (employee as any)._id,
      });
      if (!salary)
        throw new AppError({
          message: "salary not found",
          statusCode: 404,
        });

      if (salary.amount < amount)
        throw new AppError({
          message: "new salary cannot lower than current salary",
          statusCode: 400,
        });

      await salaryService.updateData(employee._id, {
        amount,
        description,
        previousSalary: salary.amount,
      });

      response.createResponse({
        res,
        code: 200,
        message: "ok",
      });
    } catch (err) {
      next(err);
    }
  }
})();
