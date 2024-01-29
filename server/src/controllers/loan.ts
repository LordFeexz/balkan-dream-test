import type { Request, Response, NextFunction } from "express";
import loanValidation from "../validations/loan";
import Employee from "../models/employee";
import response from "../middlewares/response";
import type { IEmployee } from "../interfaces/employee";
import AppError from "../base/error";
import Loan from "../models/loan";
import Salary from "../models/salary";
import helpers from "../helpers";
import { startSession } from "mongoose";
import LoanNote from "../models/loanNote";

export default new (class LoanController {
  public async createLoan(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const session = await startSession();
    session.startTransaction();
    try {
      const {
        amount,
        employeeId,
        unit,
        date,
        description,
        period,
        note,
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

      const salary = await Salary.findOne({
        employeeId: (employee as any)._id,
      });
      if (!salary)
        throw new AppError({
          message: "salary not found",
          statusCode: 404,
        });

      //you can change the schema implementation
      if (salary.amount < amount)
        throw new AppError({
          message: "loan amount cannot greater than salary amount",
          statusCode: 400,
        });

      const data = await Loan.create(
        [
          {
            amount,
            installment: helpers.countInstallment(
              amount,
              period,
              amount * (1 / 100)
            ),
            date,
            unit,
            description,
            employeeId: (employee as any)._id,
            period,
          },
        ],
        { session }
      );

      if (note)
        await LoanNote.create(
          [
            {
              description: note,
              employeeId: (employee as any)._id,
              loanId: (data[0] as any)._id,
            },
          ],
          { session }
        );

      await session.commitTransaction();
      response.createResponse({
        res,
        code: 201,
        message: "success",
        data: data[0],
      });
    } catch (err) {
      await session.abortTransaction();
      next(err);
    } finally {
      await session.endSession();
    }
  }
})();
