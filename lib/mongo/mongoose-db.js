import getEnv from '../utils/get-env';
import mongoose from 'mongoose';

getEnv();

const databaseName = 'wired-tiger';
const uriRoot = `omni-cli-cluster-qmluk.mongodb.net/${databaseName}`;
const uriOpts = '?retryWrites=true&w=majority';
const mongoURI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${uriRoot}${uriOpts}`;

function testMongooseConnection() {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection Error:'));
  db.once('open', function () {
    const testSchema = new mongoose.Schema({
      testKey: String
    });
    const TestModel = mongoose.model('TestObject', testSchema, 'OverWriteTestCollectionName');
    const toUpload = new TestModel({ testKey: 'foobar' });
    toUpload.save((err, res) => {
      if (err) return console.error(err);
      console.log("Uploaded successfully!");
      console.log(res);
    })
  })
};

async function establishMongooseConnection() {
  try {
    console.log("Establishing connection to Mongo Cluster...")
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    });
    return ({
      success: true,
      message: 'Connection to remote Mongo DB Established.'
    });
  } catch (err) {
    throw new Error("There has been an error connecting to the MongoDB Service");
  };
};


export {
  testMongooseConnection,
  establishMongooseConnection
}