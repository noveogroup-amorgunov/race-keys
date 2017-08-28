const errorHandlerMiddleware = require('./error-handler');
const mongooseErrorHandlerMiddleware = require('./mongoose-error-handler');
const responseMiddleware = require('./response-middleware');
const isAuthenticated = require('./authMiddleware');
const socketMiddleware = require('./socket-middleware');
const notFoundMiddleware = require('./not-found-middleware');

module.exports = {
    errorHandlerMiddleware,
    mongooseErrorHandlerMiddleware,
    responseMiddleware,
    notFoundMiddleware,
    socketMiddleware,
    isAuthenticated,
};
