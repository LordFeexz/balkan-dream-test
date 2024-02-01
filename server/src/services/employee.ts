import { isValidObjectId, Types } from "mongoose";
import BaseService from "../base/services";
import type {
  EmployeeDetail,
  IEmployee,
  NewEmployeeProps,
} from "../interfaces/employee";
import employee from "../models/employee";
import type { DataWithTotal, DbOpts, Gender, SearchQuery } from "../interfaces";
import helpers from "../helpers";

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
    ]);

    return Array.isArray(agg) ? (agg[0] as EmployeeDetail) : null;
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
})();
