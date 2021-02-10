import 'dotenv/config';
import client from './database/connection';

(async function main() {
  await client.connect();
  const dbs = await client.db().admin().listDatabases();
  console.log(dbs);
  await client.close();
})();
