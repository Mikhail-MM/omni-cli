import path from 'path';

import "chai/register-should";
import { expect } from 'chai';

import getEnv from '../lib/utils/get-env';

import {
  listAllBuckets,
  createNewBucket,
  uploadFileToBucket,
  getBucketObjects,
  deleteBucketObject,
  deleteBucketObjectPromise,
  deleteBucket,
} from '../lib/aws/s3';

getEnv();

const testBucketName = 'omni-s3-file-storage--test';
const testFilePath = path.resolve(__dirname, './mock-data/PeriodicTableKoreanFood.jpg');
const testFileName = "test-strudel.jpg";

describe('Programatically CRUD an S3 Storage Bucket', function () {
  it("Should list available s3 buckets", async function () {
    const response = await listAllBuckets();
    response.should.have.property('Buckets');
    response.should.have.property('Owner');
    response.Buckets.forEach(bucket => {
      bucket.should.have.property('Name');
    })
  });
  it('Should create a new bucket', async function () {
    const newBucket = await createNewBucket(testBucketName);
    newBucket.should.have.property('Location');
  });
  it('Should upload an image to the new bucket', async function () {
    const response = await uploadFileToBucket(testBucketName, testFilePath, testFileName);
    response.should.have.property('Location');
  });
  it('Should list all items in the bucket', async function () {
    const response = await getBucketObjects(testBucketName);
    response.should.have.property('Contents');
    response.should.have.property('MaxKeys');
    // Can check for our image here.
  });
  it('should delete the bucket and uploaded item', async function () {
    await deleteBucketObjectPromise(testBucketName, testFileName);
    const response = await deleteBucket(testBucketName);
    expect(response).to.eql({});
    // DELETE operations on S3 buckets always return empty objects
    // This is an evergreen test, we should verify by re-listing all buckets.
  })
});