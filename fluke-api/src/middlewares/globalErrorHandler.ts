import { CelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

const globalErrorHandler = (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response => {
  // custom error
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  // celebrate validation error
  if (err instanceof CelebrateError) {
    return response.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};

export default globalErrorHandler;
