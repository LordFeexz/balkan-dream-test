import type { Request, Response, NextFunction } from "express";
import loanValidation from "../validations/loan";
import Employee from "../models/employee";
import response from "../middlewares/response";
import type { IEmployee } from "../interfaces/employee";
import AppError from "../base/error";
import Loan from "../models/loan";

export default new (class LoanController {
  public async createLoan(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        amount,
        employeeId,
        unit,
        date,
        description,
        period,
      } = await loanValidation.validateCreateLoan(req.body);

      const employee = await ((Employee as unknown) as IEmployee).getByIdentifier(
        employeeId
      );
      if (!employee)
        throw new AppError({
          message: "employee not found",
          statusCode: 404,
        });

      const now = new Date();
      if (employee.firingdate && employee.firingdate < now)
        throw new AppError({
          message: "employee is already fired",
          statusCode: 400,
        });

      const startWork = employee.startdate;
      startWork.setDate(startWork.getMonth() + 2 + (startWork.getDate() + 28));
      if (startWork < now)
        throw new AppError({
          message:
            "employee hasnt start working or employee hasnt been working for at least one month",
          statusCode: 400,
        });

      if (
        await Loan.findOne({
          employeeId: (employee as any)._id,
          status: "Process",
        })
      )
        throw new AppError({
          message: "employee has an active loan",
          statusCode: 409,
        });

      //check salary

      await Loan.create({
        amount,
        installment: 0,
        date,
        unit,
        description,
        employeeId: (employee as any)._id,
        period,
      });

      response.createResponse({
        res,
        code: 201,
        message: "success",
        data: { employee },
      });
    } catch (err) {
      next(err);
    }
  }
})();
