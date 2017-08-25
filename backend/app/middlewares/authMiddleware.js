const UserRepository = require('../repositories/userRepository');
const { UnauthorizedException } = require('../exceptions');

const { Token } = require('mongoose').models;

const auth = async (ctx, next) => {
    if (ctx.header && ctx.header.authorization) {
        const token = ctx.header.authorization;
        const user = await UserRepository.findByNotExpiredToken(token, Token.types.ACCESS);
        if (user) {
            ctx.state.user = user;
            ctx.state.token = token;
            await next();
            return;
        }
    }
    throw new UnauthorizedException();
};

module.exports = auth;
