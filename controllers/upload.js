const uploadService = require('../services/upload');
const { STATUS_CODES, MESSAGES: MSG } = require('../services/constants');
const { sendSuccess, sendError } = require('../services/common');


/**
 * @desc Handle file uploading on cloud
 */
exports.fileUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error(MSG.FILE_NOT_PROVIDED);
    }

    // Upload file to cloud(any of s3 or cloudinary) and get the file url
    
    // const fileUrl = await uploadService.uploadToS3(req.file); // for s3 upload (paid service)
    
    const fileUrl = await uploadService.uploadToCloudinary(req.file); // for cloudinary upload (free service suitable for testing purpose)

    return sendSuccess(res, {fileUrl}, STATUS_CODES.SUCCESS );
  } catch (err) {
    next(err)
  }
};
