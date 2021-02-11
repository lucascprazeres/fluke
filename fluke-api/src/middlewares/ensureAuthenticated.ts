import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import authConfig from '../config/authConfig';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, 'JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as ITokenPayload;

    request.body.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError(401, 'Invalid JWT token');
  }
};

export default ensureAuthenticated;
