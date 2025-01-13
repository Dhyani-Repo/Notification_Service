import { Request, Response } from "express";
import statusCodes from "http-status-codes";
import AppError from "./appError.utils";

interface SuccessResult {
  [key: string]: any;
}

// Error Response Handler
export const ErrorResponse = (_req: Request, res: Response, error: any) => {
  const isAppError = error instanceof AppError;
  const httpStatusCode = isAppError ? error.httpCode! : statusCodes.INTERNAL_SERVER_ERROR;

  const errorResponse = {
    success: false,
    statusCodes: httpStatusCode,
    message: error.message,
    customErrorCode: error.customErrorCode,
    metaData: error.metaData,
    stack: process.env.NODE_ENV !== "prod" ? error.stack || error?.error?.stack : null,
  };

  console.error({
    message: errorResponse.message,
    errorObj: errorResponse,
    source: "ErrorResponse",
  });

  res.status(httpStatusCode).json(errorResponse);
};

// Success Response Handler
export const SuccessResponse = (
  _req: Request,
  res: Response,
  result: SuccessResult,
  httpCode: number = statusCodes.OK
) => {
  const successResponse = {
    success: true,
    statusCodes: httpCode,
    ...result,
  };

  res.status(httpCode).json(successResponse);
};
