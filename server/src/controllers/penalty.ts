import type { Request, Response, NextFunction } from "express";
import penaltyValidation from "../validations/penalty";
import employeeService from "../services/employee";
import AppError from "../base/error";
import penaltyService from "../services/penalty";
import response from "../middlewares/response";

export default new (class PenaltyController {
  public async createPenalty(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { employeeId } = req.params;

      const employee = await employeeService.getByIdentifier(employeeId);
      if (!employee)
        throw new AppError({
          message: "employee not found",
          statusCode: 404,
        });

      response.createResponse({
        res,
        code: 201,
        message: "success",
        data: await penaltyService.createPenalty(
          employee._id,
          await penaltyValidation.validateCreatePenalty(req.body)
        ),
      });
    } catch (err) {
      next(err);
    }
  }
})();
