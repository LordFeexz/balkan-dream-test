import { isValidObjectId, Types } from "mongoose";
import BaseService from "../base/services";
import type {
  EmployeeDetail,
  EmployeeName,
  EmployeeSalaryDetail,
  IEmployee,
  NewEmployeeProps,
} from "../interfaces/employee";
import employee from "../models/employee";
import type { DataWithTotal, DbOpts, Gender, SearchQuery } from "../interfaces";
import helpers from "../helpers";
import type { ILoan } from "../interfaces/loan";
import type { ISalary } from "../interfaces/salary";

export default new (class Employee extends BaseService<IEmployee> {
  constructor() {
    super(employee);
  }

  public async getByIdentifier(identifier: string) {
    const condition: any[] = [{ JMBG: identifier }];
    if (isValidObjectId(identifier))
      condition.push({ _id: new Types.ObjectId(identifier) });

    return (await this.model.findOne({ $or: condition })) as IEmployee | null;
  }

  public async createEmployee(
    payload: {
      name: string;
      surname: string;
      JMBG: string;
      birthdate: Date;
      gender: Gender;
      position: string;
      isPayoneer: boolean;
      startdate: Date;
    },
    DbOpts?: DbOpts
  ) {
    return await this.createOneData(payload, DbOpts);
  }

  public async createManyEmployee(data: NewEmployeeProps[], DbOpts?: DbOpts) {
    return await this.createMany(data, DbOpts);
  }

  public async findEmployeeDetail(_id: Types.ObjectId) {
    try {
      const agg = await this.model.aggregate([
        {
          $match: {
            _id,
          },
        },
        {
          $lookup: {
            from: "salaries",
            localField: "_id",
            foreignField: "employeeId",
            as: "salary",
          },
        },
        {
          $unwind: "$salary",
        },
        {
          $lookup: {
            from: "loans",
            localField: "_id",
            foreignField: "employeeId",
            as: "loans",
          },
        },
        {
          $lookup: {
            from: "loanpayments",
            localField: "_id",
            foreignField: "employeeId",
            as: "loanPayments",
          },
        },
        {
          $lookup: {
            from: "bonus",
            localField: "_id",
            foreignField: "employeeId",
            as: "bonuses",
          },
        },
        {
          $lookup: {
            from: "penalties",
            localField: "_id",
            foreignField: "employeeId",
            as: "penalties",
          },
        },
      ]);

      return Array.isArray(agg) ? (agg[0] as EmployeeDetail) : null;
    } catch (err) {
      return null;
    }
  }

  public async findEmployees({
    search,
    sortBy,
    direction,
    limit,
    page,
  }: SearchQuery): Promise<DataWithTotal<IEmployee[]>> {
    const query: any[] = [];

    if (search)
      query.push({
        $match: {
          $or: helpers.getUserSearch(search),
        },
      });

    query.push(
      {
        $facet: {
          data: [
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
            {
              $lookup: {
                from: "salaries",
                localField: "_id",
                foreignField: "employeeId",
                as: "salary",
              },
            },
            {
              $unwind: "$salary",
            },
            {
              $lookup: {
                from: "loans",
                localField: "_id",
                foreignField: "employeeId",
                as: "loans",
              },
            },
            {
              $sort: {
                [helpers.allowedSortedField(
                  ["createdAt", "updatedAt", "gender", "_id"],
                  sortBy,
                  "createdAt"
                )]: helpers.getSortDirection(direction),
              },
            },
          ],
          count: [{ $count: "total" }],
        },
      },
      {
        $unwind: "$count",
      },
      {
        $project: {
          data: 1,
          total: "$count.total",
        },
      }
    );
    try {
      const [result] = await this.model.aggregate<DataWithTotal<IEmployee[]>>(
        query
      );
      return result;
    } catch (err) {
      return {
        data: [],
        total: 0,
      };
    }
  }

  public async getListEmployeeName() {
    try {
      const [result] = await this.model.aggregate([
        {
          $facet: {
            data: [
              {
                $project: {
                  _id: 1,
                  surname: 1,
                },
              },
            ],
            total: [
              {
                $count: "total",
              },
            ],
          },
        },
        { $unwind: "$total" },
        {
          $project: {
            data: 1,
            total: "$total.total",
          },
        },
      ]);
      return result as { data: EmployeeName[]; total: number };
    } catch (err) {
      return {
        data: [],
        total: 0,
      };
    }
  }

  public async inActivatedAnEmployee(_id: Types.ObjectId, dbOpts?: DbOpts) {
    return await this.model.findByIdAndUpdate(
      _id,
      {
        $set: {
          enddate: new Date(),
        },
      },
      { ...dbOpts, new: true }
    );
  }

  public async activatedAnEmployee(_id: Types.ObjectId, dbOpts?: DbOpts) {
    return await this.model.findByIdAndUpdate(
      _id,
      {
        $set: {
          enddate: null,
        },
      },
      { ...dbOpts, new: true }
    );
  }

  public async findMultipleByJMBG(jmbg: string[]) {
    return await this.model.find({ JMBG: { $in: jmbg } });
  }

  public async findMultipleByIds(ids: Types.ObjectId[]) {
    return await this.model.find({ _id: { $in: ids } });
  }

  public async findMultipleByIdsAndPopulate(ids: Types.ObjectId[]) {
    return (await this.model.aggregate([
      {
        $match: {
          _id: { $in: ids },
        },
      },
      {
        $lookup: {
          from: "loans",
          localField: "_id",
          foreignField: "employeeId",
          as: "loans",
        },
      },
      {
        $lookup: {
          from: "salaries",
          localField: "_id",
          foreignField: "employeeId",
          as: "salary",
        },
      },
      {
        $unwind: "$salary",
      },
    ])) as (IEmployee & { loans: ILoan[]; salary: ISalary })[];
  }

  public async getEmployeeSalary(exchangeRate: number) {
    return await this.model.aggregate<EmployeeSalaryDetail>([
      {
        $match: {
          startdate: {
            $lte: new Date(),
          },
          $or: [
            {
              enddate: null,
            },
            {
              enddate: {
                $exists: false,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "loans",
          let: {
            userId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$employeeId", "$$userId"],
                    },
                    {
                      $eq: ["$status", "Process"],
                    },
                  ],
                },
              },
            },
          ],
          as: "loan",
        },
      },
      {
        $unwind: "$loan",
      },
      {
        $lookup: {
          from: "loannotes",
          localField: "loan._id",
          foreignField: "loanId",
          as: "note",
        },
      },
      {
        $unwind: {
          path: "$note",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "salaries",
          localField: "_id",
          foreignField: "employeeId",
          as: "salary",
        },
      },
      {
        $unwind: "$salary",
      },
      {
        $lookup: {
          from: "penalties",
          let: {
            userId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$isPayed", false],
                    },
                    {
                      $eq: ["$employeeId", "$$userId"],
                    },
                  ],
                },
              },
            },
          ],
          as: "penalties",
        },
      },
      {
        $unwind: {
          path: "$penalties",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "bonus",
          let: {
            userId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$employeeId", "$$userId"],
                    },
                  ],
                },
              },
            },
            {
              $match: {
                $expr: {
                  $or: [
                    {
                      $eq: ["$isRepeating", true],
                    },
                    {
                      $eq: [
                        {
                          $size: "$paymentHistory",
                        },
                        0,
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "bonuses",
        },
      },
      {
        $unwind: {
          path: "$bonuses",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          totalInstallment: {
            $sum: {
              $cond: [
                {
                  $eq: ["$loan.installment", "BAM"],
                },
                {
                  $multiply: ["$loan.installment", exchangeRate],
                },
                "$loan.installment",
              ],
            },
          },
          loan: {
            $first: "$loan",
          },
          totalBonus: {
            $sum: {
              $cond: [
                {
                  $eq: ["$bonuses.unit", "BAM"],
                },
                {
                  $multiply: ["$bonuses.amount", exchangeRate],
                },
                "$bonuses.amount",
              ],
            },
          },
          bonuses: {
            $push: "$bonuses",
          },
          totalPenalties: {
            $sum: {
              $cond: [
                {
                  $eq: ["$penalties.unit", "BAM"],
                },
                {
                  $multiply: ["$penalties.amount", exchangeRate],
                },
                "$penalties.amount",
              ],
            },
          },
          penalties: {
            $push: "$penalties",
          },
          surname: {
            $first: "$surname",
          },
          salary: {
            $first: "$salary.amount",
          },
        },
      },
      {
        $addFields: {
          takeHomePay: {
            $subtract: [
              {
                $add: ["$salary", "$totalBonus"],
              },
              {
                $add: ["$totalPenalties", "$totalInstallment"],
              },
            ],
          },
          bonuses: {
            $cond: {
              if: {
                $gt: ["$totalBonus", 0],
              },
              then: {
                $map: {
                  input: "$bonuses",
                  as: "bonus",
                  in: {
                    _id: "$$bonus._id",
                    amount: {
                      $cond: [
                        {
                          $eq: ["$$bonus.unit", "BAM"],
                        },
                        {
                          $multiply: ["$$bonus.amount", exchangeRate],
                        },
                        "$$bonus.amount",
                      ],
                    },
                  },
                },
              },
              else: [],
            },
          },
          penalties: {
            $cond: {
              if: {
                $gt: ["$totalPenalties", 0],
              },
              then: {
                $map: {
                  input: "$penalties",
                  as: "penalty",
                  in: {
                    _id: "$$penalty._id",
                    amount: {
                      $cond: [
                        {
                          $eq: ["$$penalty.unit", "BAM"],
                        },
                        {
                          $multiply: ["$$penalty.amount", exchangeRate],
                        },
                        "$$penalty.amount",
                      ],
                    },
                  },
                },
              },
              else: [],
            },
          },
          isLastInstallment: {
            $cond: {
              if: {
                $eq: [
                  {
                    $subtract: ["$loan.period", 1],
                  },
                  {
                    $size: "$loan.paymentHistory",
                  },
                ],
              },
              then: true,
              else: false,
            },
          },
          loanDetail: {
            $cond: {
              if: {
                $gt: [{ $type: "$loan" }, "missing"],
              },
              then: {
                _id: "$loan._id",
                installment: "$totalInstallment",
              },
              else: null,
            },
          },
        },
      },
      {
        $project: {
          loan: 0,
        },
      },
    ]);
  }
})();
