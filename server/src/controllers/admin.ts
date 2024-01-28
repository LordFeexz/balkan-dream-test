import type { Request, Response, NextFunction } from "express";
import adminValidation from "../validations/admin";
import Admin from "../models/admin";
import bcrypt from "../utils/bcrypt";
import AppError from "../base/error";
import jwt from "../utils/jwt";
import response from "../middlewares/response";

export default new (class AdminController {
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = await adminValidation.loginValidate(req.body);

      const admin = await Admin.findOne({ email });
      if (!admin || bcrypt.compare(password, admin.password))
        throw new AppError({
          message: "invalid credentials",
          statusCode: 401,
        });

      response.createResponse({
        res,
        code: 200,
        message: "OK",
        data: jwt.createToken(admin._id.toString()),
      });
    } catch (err) {
      next(err);
    }
  }
})();
