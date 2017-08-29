const logger = require('winston');
const util = require('util');

const {
    UnauthorizedException,
    BadRequestException,
    PermissionDeniedException,
    UnprocessableEntityException,
    NotFoundException,
    ConflictException
} = require('../exceptions');

const dontReport = [
    UnauthorizedException,
    BadRequestException,
    PermissionDeniedException,
    UnprocessableEntityException,
    NotFoundException,
    ConflictException,
];

module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        logger.info(`Error handler error: ${util.inspect(err, false, null)}`);
        ctx.status = err.status || 500;
        if (dontReport.some(silent => err instanceof silent)) {
            ctx.body = err;
            return;
        }
        if (process.env.NODE_ENV === 'development') {
            ctx.body = err.stack;
        } else {
            ctx.body = { error: 'Internal server error' };
        }
        ctx.app.emit('error', err, ctx);
    }
};
