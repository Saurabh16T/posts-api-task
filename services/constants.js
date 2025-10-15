module.exports = {
    
    // http status codes used in api responses
    STATUS_CODES: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },

    // error messages
    MESSAGES: {
       FILE_NOT_PROVIDED: "File not provided",
       BODY_IS_MISSING: "Body is missing",
       INTERNAL_SERVER_ERROR: "Internal server error",
       KEYWORD_CANNOT_BE_EMPTY: "Keyword cannot be null or empty",
    },
}