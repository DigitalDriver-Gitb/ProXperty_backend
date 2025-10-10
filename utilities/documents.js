import path from 'path';
import { uploadFile } from './s3HelperUtility.js';

async function uploadImageToS3(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                message: 'No file uploaded' 
            });
        }

        const filePath = req.file.path;
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        
        if (req.file.originalname) {
            req.file.originalname = req.file.originalname.replace(/\s/g, '').replace(/-/g, '');
        }
        
        // Use the uploadFile function from s3HelperUtility
        const result = await uploadFile(req.file);

        return res.json({
            success: true,
            message: 'Image uploaded successfully',
            url: result.Location, // The S3 URL is available in the Location property
            key: result.Key       // The S3 object key
        });

    } catch (error) {
        console.error('Error uploading to S3:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to upload image',
            error: error.message
        });
    }
}

export default uploadImageToS3;