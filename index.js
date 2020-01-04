import getEnv from './lib/utils/get-env';
import { physicalItems } from './server/data/items'
import { testMongooseConnection } from './lib/mongo/mongoose-db';

getEnv();

testMongooseConnection();
