const express = require('express');
const router = express.Router();
const uploadService = require('../services/upload');
const uploadController = require('../controllers/upload');

/**
 * @swagger
 * /upload:
 *
 *  post:
 *    summary: Upload a file
 *
 *    tags:
 *      - Upload
 *
 *    requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file/image to be uploaded.
 *
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.post('/', uploadService.upload.single('file'), uploadController.fileUpload);

module.exports = router;
