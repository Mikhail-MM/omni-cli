// Mongo Driver 3.4 Quick Start:
//  https://mongodb.github.io/node-mongodb-native/3.4/quick-start/quick-start/
import "chai/register-should";
import { expect } from 'chai';

import Mongo from 'mongodb';

import getEnv from '../lib/utils/get-env';

getEnv();

const MongoClient = Mongo.MongoClient;
const uriRoot = 'omni-cli-cluster-qmluk.mongodb.net';
const uriOpts = '?retryWrites=true&w=majority';

describe('Connect to MongoDB Instance Using MongoDB-Node Driver', function () {

  const mongoURI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${uriRoot}${uriOpts}`;

  const MongoDriverInstance = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  afterEach(function () {
    MongoDriverInstance.close();
  })

  it('Should connect to a test DB and insert 3 objects', function (done) {
    MongoDriverInstance.connect(err => {
      if (err) return done(err);
      const db = MongoDriverInstance.db("test-database");
      const collection = db.collection("test-doc");
      function callbackTest(err, response) {
        if (err) return done(err);
        response.should.have.property('result');
        response.should.have.property('ops');
        response.should.have.property('insertedCount');
        response.should.have.property('insertedIds');
        expect(response.insertedCount).to.equal(2);
        expect(response.result.ok).to.equal(1);
        done();
      }
      collection.insertMany([{ a: 'foo' }, { b: 'bar' }], callbackTest);
    })
  });
});