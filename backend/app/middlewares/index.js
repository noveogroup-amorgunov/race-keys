const errorHandlerMiddleware = require('./errorHandler');
const mongooseErrorHandlerMiddleware = require('./mongooseErrorHandler');
const responseMiddleware = require('./responseMiddleware');
const isAuthenticated = require('./authMiddleware');
const notFoundMiddleware = require('./notFoundMiddleware');

module.exports = {
    errorHandlerMiddleware,
    mongooseErrorHandlerMiddleware,
    responseMiddleware,
    notFoundMiddleware,
    isAuthenticated,
};
