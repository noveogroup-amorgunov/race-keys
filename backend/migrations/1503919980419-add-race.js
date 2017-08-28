require('dotenv-extended').load();
require('./utils');

const raceRepository = require('../app/repositories/raceRepository');

exports.up = async (next) => {
    await raceRepository.createRace();
    next();
};

exports.down = (next) => {
    next();
};
