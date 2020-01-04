import fs from 'fs';
import path from 'path';

import AWS from 'aws-sdk';
import getEnv from '../utils/get-env';

getEnv();

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  region: 'us-east-1',
});

function listAllBuckets() {
  return new Promise((resolve, reject) => {
    s3.listBuckets((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

function createNewBucket(bucketName) {
  const params = {
    Bucket: bucketName,
    ACL: 'public-read'
  };
  return new Promise((resolve, reject) => {
    s3.createBucket(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function uploadFileToBucket(bucketName, filePath, fileName) {
  /*
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: bucketName,
        Body: fs.createReadStream(filePath),
        Key: fileName,
        ACL: 'public-read',
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.log("couldn't upload the data")
          reject(err);
        }
        console.log("Uploaded the data.");
        resolve(data);
      });
    });
  */
  return new Promise((resolve, reject) => {
    const upload = new AWS.S3.ManagedUpload({
      service: s3,
      params: {
        Bucket: bucketName,
        Body: fs.createReadStream(filePath),
        Key: fileName,
        ACL: 'public-read',
      }
    });
    upload.send((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

function getBucketObjects(bucketName) {
  return new Promise((resolve, reject) => {
    s3.listObjects({ Bucket: bucketName }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

function deleteBucketObject(bucketName, objectKey) {
  const params = {
    Bucket: bucketName,
    Key: 'doesntexist.txt',
  };
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    })
  })
}

async function deleteBucketObjectPromise(bucketName, objectKey) {
  try {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };
    const response = await s3.deleteObject(params).promise();
    return response;
  } catch (err) {
    throw Error(err);
  }
}

function deleteBucket(bucketName) {
  return new Promise((resolve, reject) => {
    s3.deleteBucket({ Bucket: bucketName }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
}

export {
  listAllBuckets,
  createNewBucket,
  uploadFileToBucket,
  getBucketObjects,
  deleteBucketObject,
  deleteBucket,
  deleteBucketObjectPromise
}