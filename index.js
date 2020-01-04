
import path from 'path';
import fs from 'fs';

import {
  listAllBuckets,
  createNewBucket,
  uploadFileToBucket,
  getBucketObjects,
  deleteBucketObject,
  deleteBucket,
} from './lib/aws/s3';

import getEnv from './lib/utils/get-env';

getEnv();

const testBucketName = 'omni-s3-file-storage--test';
const testFilePath = path.resolve(__dirname, './__tests/mock-data/PeriodicTableKoreanFood.jpg');
const testFileName = "table.jpg";

/*
listAllBuckets()
  .then(data => console.log(data))
  .catch(err => console.log(err));

console.log("What")
createNewBucket(testBucketName)
  .then(res => console.log(res))
  .catch(err => console.log(err));

*/

async function uploadFile() {
  try {
    console.log("Attempting to upload file in trycatch promise.")
    const response = await uploadFileToBucket(testBucketName, testFilePath, testFileName);
    console.log(response);
  } catch (err) {
    console.log(err);
  };
};

uploadFile();
