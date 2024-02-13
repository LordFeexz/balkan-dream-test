import type { Request, Response, NextFunction } from "express";
import AppError from "../base/error";
import employeeService from "../services/employee";
import response from "../middlewares/response";
import salaryService from "../services/salary";

export default new (class ReportController {
  public async getSummaryData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await employeeService.getReportSummary();
      if (!data.length)
        throw new AppError({
          message: "data not found",
          statusCode: 404,
        });

      response.createResponse(
        {
          res,
          code: 200,
          message: "OK",
          data,
        },
        {
          page: 1,
          limit: data.length,
          totalData: data.length,
          totalPage: 1,
        }
      );
    } catch (err) {
      next(err);
    }
  }

  public async getSummaryDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await salaryService.getDetailSalaryPayment();
      if (!data.length)
        throw new AppError({
          message: "data not found",
          statusCode: 404,
        });

      response.createResponse(
        {
          res,
          code: 200,
          message: "OK",
          data,
        },
        {
          page: 1,
          limit: data.length,
          totalData: data.length,
          totalPage: 1,
        }
      );
    } catch (err) {
      next(err);
    }
  }

  public async getEmployeeStatistic(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await employeeService.getStatistic();
      if (!data)
        throw new AppError({
          message: "data not found",
          statusCode: 404,
        });

      response.createResponse({
        res,
        code: 200,
        message: "OK",
        data,
      });
    } catch (err) {
      next(err);
    }
  }
})();
