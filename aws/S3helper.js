import fs from "fs";
import aws from "aws-sdk";

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        s3.upload(
            {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype,
            },
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Location);
                }
            }
        );
    });
};

export default uploadFile;


