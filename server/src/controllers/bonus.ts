import type { Request, Response, NextFunction } from "express";
import employeeService from "../services/employee";
import AppError from "../base/error";
import bonusValidation from "../validations/bonus";
import response from "../middlewares/response";
import bonusService from "../services/bonus";

export default new (class BonusController {
  public async createBonus(
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
        data: await bonusService.createOne(
          employee._id,
          await bonusValidation.validateCreateBonus(req.body)
        ),
      });
    } catch (err) {
      next(err);
    }
  }
})();
