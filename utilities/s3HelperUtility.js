import fs from "fs";
import AWS from "aws-sdk";
import {Stream} from "stream";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Configure AWS with environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'ap-south-1' // Default to us-east-1 if not specified
});

const s3 = new AWS.S3();
const SES = new AWS.SES();

const uploadFile = async(file) => {
  try {
    if (!file || !file.path) {
      throw new Error('No file provided or file path is missing');
    }

    const fileContent = await fs.promises.readFile(file.path);
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || '100acress-media-bucket',
      Body: fileContent,
      Key: `uploads/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
      ContentType: file.mimetype,
       // Make the file publicly accessible
    };

    const data = await s3.upload(params).promise();
    return data;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw error;
  }
};

const uploadThumbnailImage = async(file) => {
  try {
    if (!file || !file.path) {
      throw new Error('No file provided or file path is missing');
    }

    /*Image Compression before uploading to AWS on hold for temp*/
    /*
      const originalPath = file.path;
      const compressedDir = path.join(__dirname, '../temp/Compressed');
      const compressedFileName = `${Date.now()}-${file.originalname}`;    
      const compressedPath = path.join(compressedDir, compressedFileName);
      await fs.promises.mkdir(compressedDir, { recursive: true });
      await compressImage(originalPath, compressedPath, 25);
    */  
    const fileContent = await fs.promises.readFile(file.path);
    
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || '100acress-media-bucket',
      Body: fileContent,
      Key: `thumbnails/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
      ContentType: file.mimetype,
       // Make the file publicly accessible
    };
    const uploadResult = await s3.upload(params).promise();

    /*Deleting temp file after upload S3*/
    /*
      console.log(uploadResult);
      console.log('Starting cleanup');
      console.log("Original Path: ",originalPath);
      console.log("Compressed Path: ",compressedPath);
      if(fs.existsSync(originalPath)){
        fs.unlinkSync(originalPath);
      };
      if(fs.existsSync(compressedPath)){
        fs.unlinkSync(compressedPath);
      };
    */
    return uploadResult; // Return S3 upload result
  } catch (error) {
    console.error('Error in uploadThumbnailImage:', error);
    throw error; // Let the caller handle the error
  }
};

const deleteFile = async (fileKey) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || '100acress-media-bucket',
      Key: fileKey,
    };

    await s3.deleteObject(params).promise();
    console.log(`File deleted successfully: ${fileKey}`);
    return true;
  } catch (error) {
    console.error(`Error deleting file: ${fileKey}`, error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const updateFile = async(file, objectKey) => {
  try {
    if (!file || !file.path) {
      throw new Error('No file provided or file path is missing');
    }

    const fileContent = await fs.promises.readFile(file.path);
    if (objectKey != null) {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME || '100acress-media-bucket',
        Key: objectKey,
        Body: fileContent,
        ContentType: file.mimetype,
         // Make the file publicly accessible
      };
      return s3.upload(params).promise();
    } else {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME || '100acress-media-bucket', // You can use environment variables for sensitive data like bucket name
        Key: `uploads/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`, // Store the file with a unique name in the 'uploads/' folder
        Body: fileContent,
        ContentType: file.mimetype,
         // Make the file publicly accessible
      };

      // Return the promise from s3.upload
      return s3.upload(params).promise();
    }
  } catch (error) {
    console.error('Error in updateFile:', error);
    throw error;
  }
};

const getS3File = async(objectKey) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || '100acress-media-bucket',
      Key: objectKey
    }

    const response = await s3.getObject(params).promise();

    // console.log("S3 Response headers:", response.ContentType);

    // Create a Readable stream from the response body (a Buffer)
    const readstream = require('stream').Readable.from(response.Body);

    return {
      readstream, // Match this property name in the main function
      ContentType: response.ContentType
    };
  } catch (error) {
    console.log(error);
    throw error; // Re-throw to handle in the calling function
  }
};

const sendEmail = async (to, sourceEmail , cc = [], subject, html, attachments = true ) => {

  const EmailAttachments = [
    {
      filename: "fblogo.png", // Use PNG instead of SVG
      path: path.join(__dirname, "../Templates/Email/Icons/facebook-circle-fill.png"), // Local path to your PNG file
      cid: "fblogo"
    },
    {
      filename: "lnkdlogo.png", // Use PNG instead of SVG
      path: path.join(__dirname, "../Templates/Email/Icons/linkedin-box-fill.png"), // Local path to your PNG file
      cid: "lnkdlogo"
    },
    {
      filename: "instalogo.png", // Use PNG instead of SVG
      path: path.join(__dirname, "../Templates/Email/Icons/instagram-fill.png"), // Local path to your PNG file
      cid: "instalogo"
    },
    {
      filename: "twlogo.png", // Use PNG instead of SVG
      path: path.join(__dirname, "../Templates/Email/Icons/twitter-x-line.png"), // Local path to your PNG file
      cid: "twlogo"
    }
  ]

  const transporter = nodemailer.createTransport({
    SES:{
      ses:SES,
      aws:AWS
    }
  });

  const mailOptions = {
    from: sourceEmail,
    to: to,
    cc: cc.length > 0 ? cc.join(',') : undefined,
    subject: subject,
    html: html,
    attachments: attachments ? EmailAttachments : []
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully : ", result.envelope.from, result.envelope.to);
    return true;
  } catch (error) {
    console.error("Error sending email", error);
    return false;
  }
  
  // const params = {

  //   Destination:{
  //     ToAddresses: [to],
  //     CcAddresses: [...cc],
  //   },
  //   Message:{
  //     Body:{
  //       Html:{
  //         Charset: "UTF-8",
  //         Data: html
  //       }
  //     },
  //     Subject:{
  //       Charset: "UTF-8",
  //       Data: subject
  //     },
  //     Attachments: [...attachments]
  //   },
  //   Source: sourceEmail,
  // }
  // try {
  //   const result = await SES.sendEmail(params).promise();
  //   console.log("Email sent successfully", result);
  //   return true;
  // }
  // catch (error) {
  //   console.error("Error sending email", error);
  //   return false;
  // }
}

export { uploadFile, deleteFile, updateFile, getS3File, uploadThumbnailImage, sendEmail };