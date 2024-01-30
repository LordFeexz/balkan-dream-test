import type { Request, Response, NextFunction } from "express";
import loanValidation from "../validations/loan";
import response from "../middlewares/response";
import AppError from "../base/error";
import { startSession } from "mongoose";
import employeeService from "../services/employee";
import salaryService from "../services/salary";
import loanService from "../services/loan";
import loanNoteService from "../services/loanNote";

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

      const employee = await employeeService.getByIdentifier(employeeId);
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

      if (await loanService.findEmployeeProcessedLoan(employee._id))
        throw new AppError({
          message: "employee has an active loan",
          statusCode: 409,
        });

      const salary = await salaryService.findEmployeeSalary(employee._id);
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

      const data = await loanService.createLoan(
        employee._id,
        {
          amount,
          unit,
          date,
          description,
          period,
        },
        { session }
      );

      if (note)
        await loanNoteService.createNote(
          {
            description: note,
            employeeId: employee._id,
            loanId: data._id,
          },
          { session }
        );

      await session.commitTransaction();
      response.createResponse({
        res,
        code: 201,
        message: "success",
        data,
      });
    } catch (err) {
      await session.abortTransaction();
      next(err);
    } finally {
      await session.endSession();
    }
  }
})();
