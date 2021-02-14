import 'reflect-metadata';
import 'dotenv/config';
import './dependencies';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errors as celebrateModuleErrors } from 'celebrate';
import 'express-async-errors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import routes from './routes';
import dbclient from './database/connection';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);
app.use(routes);
app.use(celebrateModuleErrors());
app.use(globalErrorHandler);

app.listen(process.env.APP_PORT, async () => {
  await dbclient.connect();
  console.log(`server up on port ${process.env.APP_PORT}!`);
});
