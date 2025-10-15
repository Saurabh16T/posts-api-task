const { STATUS_CODES, MESSAGES: MSG } = require('../services/constants');

/**
 * Sends a standardized success response
 * @param {Object} res - Express response object
 * @param {any} data - Payload to return
 * @param {number} [status=200] - HTTP status code
 */
function sendSuccess(res, data = {}, status = STATUS_CODES.SUCCESS ) {
  return res.status(status).json({
    success: true,
    data
  });
}

/**
 * Sends a standardized error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} [status=500] - HTTP status code
 */
function sendError(res, message = MSG.INTERNAL_SERVER_ERROR, status = STATUS_CODES.SERVER_ERROR) {
  return res.status(status).json({
    success: false,
    error: message
  });
}

module.exports = {
  sendSuccess,
  sendError
};
