const
    errorHandlerMiddleware = require('./error-handler'),
    mongooseErrorHandlerMiddleware = require('./mongoose-error-handler'),
    responseMiddleware = require('./response-middleware'),
    isAuthenticated = require('./authMiddleware'),
    socketMiddleware = require('./socket-middleware'),
    notFoundMiddleware = require('./not-found-middleware');

module.exports = {
    errorHandlerMiddleware,
    mongooseErrorHandlerMiddleware,
    responseMiddleware,
    notFoundMiddleware,
    socketMiddleware,
    isAuthenticated,
};
