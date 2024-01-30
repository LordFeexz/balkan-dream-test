import { Types } from "mongoose";
import type { ApplicationModel, DbOpts } from "../interfaces";
import type { BaseDocument } from "./model";

export default abstract class BaseService<T extends BaseDocument> {
  protected model: ApplicationModel<T>;
  constructor(props: ApplicationModel<T>) {
    this.model = props;
  }

  protected async createOneData(data: any, opts?: DbOpts) {
    const result = await this.model.create([data], { ...opts });

    return Array.isArray(result) ? result[0] : result;
  }

  protected async createMany(data: any[], opts?: DbOpts) {
    return await this.model.insertMany(data, { ...opts });
  }

  public async findById(id: Types.ObjectId) {
    return (await this.model.findById(id)) as T | null;
  }

  public async firedAnEmployee(_id: Types.ObjectId, dbOpts?: DbOpts) {
    return await this.model.findByIdAndUpdate(
      _id,
      {
        $set: {
          firingdate: new Date(),
        },
      },
      { ...dbOpts, new: true }
    );
  }

  public async findMultipleByJMBG(jmbg: string[]) {
    return await this.model.find({ JMBG: { $in: jmbg } });
  }
}
