const BadRequestException = require('./badRequestException');
const UnauthorizedException = require('./unauthorizedException');
const PermissionDeniedException = require('./permissionDeniedException');
const UnprocessableEntityException = require('./unprocessableEntityException');
const NotFoundException = require('./notFoundException');
const ConflictException = require('./conflictException');
const SocketException = require('./socketException');

module.exports = {
    BadRequestException,
    UnauthorizedException,
    PermissionDeniedException,
    UnprocessableEntityException,
    NotFoundException,
    ConflictException,
    SocketException,
};
