import type { Request, Response, NextFunction } from "express";
import salaryValidation from "../validations/salary";
import AppError from "../base/error";
import employeeService from "../services/employee";
import salaryService from "../services/salary";
import response from "../middlewares/response";
import {
  startSession,
  type MongooseBulkWritePerWriteOptions,
  Types,
} from "mongoose";
import type { AnyBulkWriteOperation } from "mongodb";
import currencyExchanger from "../third-party/currencyExchanger";
import helpers from "../helpers";
import encryption from "../utils/encryption";
import type { ISalary } from "../interfaces/salary";
import type { IPenalty } from "../interfaces/penalty";
import type { IBonus } from "../interfaces/bonus";
import type { CreateLoanPaymentProps, ILoan } from "../interfaces/loan";
import penaltyService from "../services/penalty";
import bonusService from "../services/bonus";
import loanService from "../services/loan";
import loanPaymentService from "../services/loanPayment";

export default new (class SalaryController {
  public async raiseUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { amount, description } =
        await salaryValidation.validateUpdateSalary(req.body);
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
      const currency = await currencyExchanger.getUsdExchangeRate();
      if (!currency)
        throw new AppError({
          message: "failed getting currency exchange data",
          statusCode: 502,
        });

      const exchangeRate = helpers.parseToFloat(
        currency["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
      );
      if (!exchangeRate)
        throw new AppError({
          message: "failed getting currency exchange data",
          statusCode: 502,
        });

      const data = await employeeService.getEmployeeSalary(exchangeRate);
      response.createResponse({
        res,
        code: 200,
        message: "success",
        data: {
          data,
          signature: encryption.signSignatureSalary(
            data,
            req.headers["access_token"] as string
          ),
          unit: "$",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async releaseSalary(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const session = await startSession();
    session.startTransaction();
    try {
      const { datas } = await salaryValidation.validateReleaseSalary(
        req.body,
        req.headers["access_token"] as string
      );

      const updateSalaryModel: (AnyBulkWriteOperation<ISalary> &
        MongooseBulkWritePerWriteOptions)[] = [];
      const updatePenaltyModel: (AnyBulkWriteOperation<IPenalty> &
        MongooseBulkWritePerWriteOptions)[] = [];
      const updateBonusModel: (AnyBulkWriteOperation<IBonus> &
        MongooseBulkWritePerWriteOptions)[] = [];
      const createLoanPayment: (CreateLoanPaymentProps & {
        loanId: Types.ObjectId;
        employeeId: Types.ObjectId;
      })[] = [];
      const updateLoanModel: (AnyBulkWriteOperation<ILoan> &
        MongooseBulkWritePerWriteOptions)[] = [];
      const now = new Date();
      for (const {
        _id,
        takeHomePay,
        totalBonus,
        totalInstallment,
        totalPenalties,
        penalties,
        salary,
        surname,
        bonuses,
        isLastInstallment,
        loanDetail,
      } of datas) {
        const employeeId = new Types.ObjectId(_id);
        updateSalaryModel.push({
          updateOne: {
            filter: {
              employeeId,
            },
            update: {
              $push: {
                paymentHistory: {
                  amount: takeHomePay,
                  date: now,
                  unit: "$",
                  description: "salary takehomepay payment",
                },
              },
            },
          },
        });

        if (totalPenalties)
          updatePenaltyModel.push({
            updateOne: {
              filter: {
                employeeId,
                _id: {
                  $in: penalties.map(({ _id }) => new Types.ObjectId(_id)),
                },
              },
              update: {
                $set: {
                  isPayed: true,
                },
              },
            },
          });

        if (totalBonus)
          updateBonusModel.push({
            updateOne: {
              filter: {
                employeeId,
                _id: {
                  $in: bonuses.map(({ _id }) => new Types.ObjectId(_id)),
                },
              },
              update: {
                $push: {
                  paymentHistory: {
                    $each: bonuses.map(({ amount }) => ({
                      amount,
                      description: "employee bonus payment",
                      date: new Date(),
                    })),
                  },
                },
              },
            },
          });

        if (totalInstallment && loanDetail) {
          updateLoanModel.push({
            updateOne: {
              filter: {
                employeeId,
                status: "Process",
              },
              update: {
                $set: {
                  status: isLastInstallment ? "Finish" : "Process",
                },
                $push: {
                  paymentHistory: {
                    unit: "$",
                    date: now,
                    description: "employee loan payment",
                    amount: totalInstallment,
                  },
                },
              },
            },
          });

          createLoanPayment.push({
            date: now,
            description: "employee loan payment",
            unit: "$",
            amount: totalInstallment,
            employeeId,
            loanId: loanDetail?._id,
          });
        }
      }
      const handler = [];
      if (updatePenaltyModel.length)
        handler.push(
          penaltyService.bulkUpdate(updatePenaltyModel, { session })
        );
      if (updateSalaryModel.length)
        handler.push(salaryService.bulkUpdate(updateSalaryModel, { session }));
      if (updateBonusModel.length)
        handler.push(bonusService.bulkUpdate(updateBonusModel, { session }));
      if (updateLoanModel.length)
        handler.push(loanService.bulkUpdate(updateLoanModel, { session }));
      if (createLoanPayment.length)
        handler.push(
          loanPaymentService.createManyData(createLoanPayment, { session })
        );

      if (handler.length) await Promise.all(handler);

      await session.commitTransaction();
      response.createResponse({
        res,
        code: 200,
        message: "success",
      });
    } catch (err) {
      await session.abortTransaction();
      next(err);
    } finally {
      await session.endSession();
    }
  }
})();
