import { MongoClient } from 'mongodb';
import databaseConfig from '../config/databaseConfig';

const client = new MongoClient(databaseConfig.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

export default client;
