require('dotenv-extended').load();
require('./utils');

const userRepository = require('../app/repositories/userRepository');

const data = {
    user1: {
        login: 'mike',
        password: '123'
    },
    user2: {
        login: 'piter',
        password: '123'
    },
};

exports.up = async (next) => {
    await userRepository.createUser(data.user1);
    await userRepository.createUser(data.user2);
    next();
};

exports.down = (next) => {
    next();
};
