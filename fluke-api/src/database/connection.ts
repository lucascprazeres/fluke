import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URL || '', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

export default client;
