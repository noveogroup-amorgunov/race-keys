require('dotenv-extended').load();
require('./utils');
const { Race } = require('../app/models');
const raceRepository = require('../app/repositories/raceRepository');

exports.up = async (next) => {
    await raceRepository.createRace();
    next();
};

exports.down = async (next) => {
    await Race.remove({});
    next();
};
