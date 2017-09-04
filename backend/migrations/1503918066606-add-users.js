require('dotenv-extended').load();
require('./utils');
const { User } = require('../app/models');
const userRepository = require('../app/repositories/userRepository');

const users = [{
    login: 'mike',
    password: '123',
    game: {
        races: 11,
        averageSpeed: 230,
        maxSpeed: 234,
    },
}, {
    login: 'piter',
    password: '123'
}];

exports.up = async (next) => {
    await Promise.all(users.map(async (userData) => {
        await userRepository.createUser(userData);
    }));
    next();
};

exports.down = async (next) => {
    await User.remove({});
    next();
};
