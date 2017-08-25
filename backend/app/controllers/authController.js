const _ = require('lodash');
const moment = require('moment');
const { Token } = require('mongoose').models;
const userRepository = require('../repositories/userRepository');
const userFormatter = require('../formatters/userFormatter');
const config = require('../../config');
const errorMessages = require('../../config/errorMessages');
const generateToken = require('../services/generateToken');

const {
    BadRequestException,
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
        const checkUser = await userRepository.findByLogin(login);

        if (checkUser) {
            throw new BadRequestException(errorMessages.usernameAlreadyUsed);
        }

        const user = await userRepository.createUser({ login, password });
        const accessToken = await createAccessToken(user);

        ctx.body = {
            token: accessToken,
            user: userFormatter.get(user),
        };
        ctx.status = 201;
    },

    async login(ctx) {
        const { login, password } = ctx.request.body;
        const user = await userRepository.findByLogin(login);

        if (!user || !user.password || !await user.comparePassword(password)) {
            throw new BadRequestException(errorMessages.invalidPassword);
        }

        const accessToken = await createAccessToken(user);

        ctx.body = {
            token: accessToken,
            user: userFormatter.get(user),
        };
    },
    async test(ctx) {
        global.io.to('main').emit('action', { type: 'NEW_RACE_CREATED' });

        ctx.body = ctx.state.user;
        ctx.status = 200;
    }
};
