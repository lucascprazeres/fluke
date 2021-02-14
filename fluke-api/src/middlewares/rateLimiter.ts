import { Request, Response, NextFunction } from 'express';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import { MongoClient } from 'mongodb';
import AppError from '../errors/AppError';

import config from '../config/databaseConfig';

const mongoConn = MongoClient.connect(config.url);

const limiter = new RateLimiterMongo({
  storeClient: mongoConn,
  keyPrefix: 'rateLimit',
  points: 5,
  duration: 1,
});

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError(429, 'Too many requests.');
  }
}

export default rateLimiter;
