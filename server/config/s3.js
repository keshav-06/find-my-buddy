const S3 = require("aws-sdk/clients/S3");
const keys = require("./key");
const fs = require("fs");

const bucketName = keys.aws.bucketName;
const region = keys.aws.bucketRegion;
const accessKeyId = keys.aws.accessKey;
const secretAccessKey = keys.aws.secretKey;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3
    .upload(uploadParams)
    .promise()
    .catch((err) => {
      console.log("Error while uploading to S3: " + err);
      console.log("S3 CREDS: " + s3.config.credentials);
    });
}

exports.uploadFile = uploadFile;
