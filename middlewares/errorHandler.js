const { STATUS_CODES, MESSAGES: MSG } = require('../services/constants');

const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the full error for debugging
    
    const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR; // default status code
    
    const errorMessage = err.message || MSG.INTERNAL_SERVER_ERROR; // default err mssg
    
    return res.status(statusCode).json({
        success: false,
        error: errorMessage
    });
};

module.exports = errorHandler;
