const aws = require('aws-sdk');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// AWS S3 CONFIG
aws.config.update({
  accessKeyId: process.env.S3_BUCKET_ID,
  secretAccessKey: process.env.S3_BUCKET_KEY,
  region: process.env.S3_BUCKET_REGION
});
const s3 = new aws.S3();

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Memory storage for multer (files will be temporarily stored in memory)
const storage = multer.memoryStorage();

// Multer upload handler
const upload = multer({ storage: storage })

// Function to upload to AWS S3
async function uploadToS3(file) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`, // date prefix makes each file name unique on s3
    Body: file.buffer,
    ACL: 'public-read', // public access
    ContentType: file.mimetype
  };
  
  try {
    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location; // Return the file url
  } catch (error) {
    throw new Error(`Failed to upload to S3: ${error.message}`);
  }
}

// Function to upload file to Cloudinary
function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'idea_usher' },
      (error, result) => {
        if (error) return reject(new Error(`Failed to upload to Cloudinary: ${error.message}`));
        return resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

// Export the upload middleware and the file upload handler
module.exports = {
  upload,
  uploadToS3,
  uploadToCloudinary,
};
