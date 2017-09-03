const _ = require('lodash');
const userRepository = require('../repositories/userRepository');
const userFormatter = require('../formatters/userFormatter');
const errorMessages = require('../../config/errorMessages');
const { BadRequestException } = require('../exceptions');

module.exports = {
    async signup(ctx) {
        const { login, password, car } = ctx.request.body;
        const checkUser = await userRepository.findByLogin(login);

        if (checkUser) {
            throw new BadRequestException(errorMessages.usernameAlreadyUsed);
        }

        const user = await userRepository.createUser({ login, password, car });
        const accessToken = await userRepository.createAccessToken(user);

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

        const accessToken = await userRepository.createAccessToken(user);

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
