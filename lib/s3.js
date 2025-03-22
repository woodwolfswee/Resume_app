import AWS from "aws-sdk";
import fs from "fs";
import path from "path";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function downloadResumeFromS3(bucketName, fileName) {
  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  const filePath = path.join("/tmp", fileName); // Temp storage for processing

  const file = fs.createWriteStream(filePath);
  const data = await s3.getObject(params).promise();
  file.write(data.Body);
  file.end();

  return filePath;
}
