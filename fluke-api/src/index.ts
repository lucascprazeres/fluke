import 'reflect-metadata';
import 'dotenv/config';
import './dependencies';
import express from 'express';
import cors from 'cors';
import { errors as celebrateModuleErrors } from 'celebrate';
import 'express-async-errors';
import routes from './routes';
import dbclient from './database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(celebrateModuleErrors());

const port = 3333;

app.listen(port, async () => {
  await dbclient.connect();
  console.log(`server up on port ${port}!`);
});
