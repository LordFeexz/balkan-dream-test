import type { Request, Response, NextFunction } from "express";
import employeeValidation from "../validations/employee";
import employee from "../models/employee";
import response from "../middlewares/response";

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
        data: await employee.create(
          await employeeValidation.validateNewEmployee(req.body)
        ),
      });
    } catch (err) {
      next(err);
    }
  }
})();
