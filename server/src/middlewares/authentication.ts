import type { NextFunction, Request, Response } from "express";
import AppError from "../base/error";
import jwt from "../utils/jwt";
import Admin from "../models/admin";
import { Types } from "mongoose";
import type { IAdmin } from "../interfaces/admin";

export default new (class Authentication {
  public authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_token } = req.headers;
      if (!access_token)
        throw new AppError({
          message: "missing or invalid token",
          statusCode: 401,
        });

      const { _id } = jwt.verifyToken(access_token as string);

      const admin = Admin.findById(new Types.ObjectId(_id));
      if (!admin)
        throw new AppError({
          message: "missing or invalid token",
          statusCode: 401,
        });

      req.guest = (admin as unknown) as IAdmin;

      next();
    } catch (err) {
      next(err);
    }
  }
})().authenticate;
