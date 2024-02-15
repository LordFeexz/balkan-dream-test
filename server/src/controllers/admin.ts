import type { Request, Response, NextFunction } from "express";
import adminValidation from "../validations/admin";
import Admin from "../models/admin";
import bcrypt from "../utils/bcrypt";
import AppError from "../base/error";
import jwt from "../utils/jwt";
import response from "../middlewares/response";
import { OAuth2Client, type TokenPayload } from "google-auth-library";

export default new (class AdminController {
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = await adminValidation.loginValidate(req.body);

      const admin = await Admin.findOne({ email });
      if (!admin || !bcrypt.compare(password, admin.password))
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

  public async googleLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { googleToken } = await adminValidation.googleLoginValidate(
        req.body
      );

      const client = new OAuth2Client(
        process.env.GOOGLE_OAUTH_CLIENT_ID,
        process.env.GOOGLE_OAUTH_CLIENT_SECRET
      );

      const ticket = await client.verifyIdToken({
        idToken: googleToken as string,
        audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
      });

      const { email } = ticket.getPayload() as TokenPayload;
      if (!email)
        throw new AppError({
          message: "invalid credentials",
          statusCode: 401,
        });

      response.createResponse({
        res,
        code: 200,
        message: "OK",
        data: jwt.createTokenEmail(email),
      });
    } catch (err) {
      next(err);
    }
  }

  public async microsoftLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { microsoftToken } = await adminValidation.microsoftLoginValidate(
        req.body
      );

      const { aud, email } = jwt.decodeToken(microsoftToken);
      if (aud !== process.env.MICROSOFT_CLIENT_ID)
        throw new AppError({
          message: "invalid credentials",
          statusCode: 401,
        });

      response.createResponse({
        res,
        code: 200,
        message: "OK",
        data: jwt.createTokenEmail(email),
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
})();
