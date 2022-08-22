// source https://www.youtube.com/watch?v=NZElg91l_ms
// const dotenv = require('dotenv');
// dotenv.config('./config.env');
const fs = require('fs')
const { S3 } = require('@aws-sdk/client-s3')

const bucketName = "no-imagination-required" //process.env.AWS_BUCKET_NAME
const region = "eu-west-2" // process.env.AWS_BUCKET_REGION
const accessKeyId = ""  // process.env.AWS_ACCESS_KEY
const secretAccessKey = "" // process.env.AWS_SECRET_KEY
console.log(bucketName, region, accessKeyId, secretAccessKey)
const s3 = new S3({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
})

// uploads a file to s3
async function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return await s3.putObject(uploadParams)
}
exports.uploadFile = uploadFile


// downloads a file from s3


async function getFileStream(fileKey, res) {
    const response = await s3.getObject({
        Bucket: bucketName,
        Key: fileKey,
    });

    return response.Body.pipe(res);
}
exports.getFileStream = getFileStream