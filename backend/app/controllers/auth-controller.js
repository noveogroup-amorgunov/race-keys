const
    _ = require('lodash'),
    moment = require('moment'),
    { Token, User } = require('mongoose').models,
    userRepository = require('../repositories/user-repository'),
    config = require('../../config'),
    generateToken = require('../services/generate_token');

const {
    UnauthorizedException,
} = require('../exceptions');

async function createAccessToken(user) {
    const token = await generateToken(24);
    const expiresIn = moment().add(config.auth.tokenLifetime, 'd').toDate();
    await Token.create({
        token,
        expiresIn,
        user: user._id,
        type: Token.types.ACCESS
    });
    return token;
}

module.exports = {
    async signup(ctx) {
        const { login, password } = ctx.request.body;

        const user = new User({ login, password });
        await user.save();

        ctx.body = {};
        ctx.status = 204;
    },

    async login(ctx) {
        const { login, password } = ctx.request.body;
        const user = await userRepository.findByLogin(login);

        if (!user || !user.password || !await user.comparePassword(password)) {
            throw new UnauthorizedException();
        }

        const accessToken = await createAccessToken(user);

        ctx.body = {
            token: accessToken,
            user,
        };
    },
    async resetPasswordRequest(ctx) {
        // const { email } = ctx.request.body;
        // await authService.resetPasswordRequest(email);
        // ctx.status = 204;
    },
    async resetPassword(ctx) {
        // const { resetToken, password } = ctx.request.body;
        // const { user, accessToken } = await authService.resetPassword(resetToken, password);
        // ctx.body = {
        //     token: accessToken,
        //     user,
        // };
    },
    async test(ctx) {
        ctx.body = ctx.state.user;
        ctx.status = 200;
    }
};
