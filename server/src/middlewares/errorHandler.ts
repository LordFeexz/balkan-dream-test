import type { NextFunction, Request, Response } from "express";
import { type ApplicationError } from "../base/error";
import response from "./response";
import type { ResponsePayload } from "../interfaces/response";

class ErrorHandler {
  public errorHandling(
    err: ApplicationError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    let message = err.message ?? "Internal Server Error";
    let code = (err as ApplicationError).statusCode ?? 500;

    const payload: ResponsePayload = {
      res,
      code,
      message,
    };
    if ((err as ApplicationError).data)
      payload.data = (err as ApplicationError).data;

    response.createResponse(payload)
  }
}

export default new ErrorHandler().errorHandling