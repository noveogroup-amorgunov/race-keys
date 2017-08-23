const mongoose = require('mongoose');
const _ = require('lodash');

const { User, Token } = require('../models');

module.exports = {
    async createUser(data) {
        const user = new User(data);
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
};
