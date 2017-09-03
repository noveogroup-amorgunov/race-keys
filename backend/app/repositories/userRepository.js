const moment = require('moment');
const generateToken = require('../services/generateToken');
const { User, Token, Car } = require('../models');
const config = require('../../config');

module.exports = {
    async createUser(data) {
        const car = await Car.findOne({ model: data.car });
        const fields = car ? Object.assign(data, { 'game.car': car.id }) : data;
        const user = new User(fields);
        return user.save();
    },

    async findByLogin(login) {
        return User.findOne({ login });
    },

    async findById(id) {
        return User.findById(id);
    },

    async findByNotExpiredToken(token) {
        const tokenWithUser = await Token.findOne({
            token,
            expiresIn: {
                $gt: Date.now()
            }
        }).populate('user');
        if (!tokenWithUser || !tokenWithUser.user) {
            return null;
        }
        return tokenWithUser.user;
    },

    async createAccessToken(user) {
        const token = await generateToken(24);
        const expiresIn = moment().add(config.auth.tokenLifetime, 'd').toDate();
        await Token.create({
            token,
            expiresIn,
            user: user._id,
            type: Token.types.ACCESS
        });
        return token;
    },
};
