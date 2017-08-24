const { Race } = require('mongoose').models;
const _ = require('lodash');

const raceRepository = require('../repositories/raceRepository');
const raceFormatter = require('../formatters/raceFormatter');
const errorMessages = require('../../config/errorMessages');
const gameActions = require('../constraints/gameActions');
const { notify } = require('../services/notifyService');

const {
    NotFoundException,
} = require('../exceptions');

module.exports = {
    async getOpenRaces(ctx) {
        const data = await raceRepository.getRacesByStatus(Race.statuses.WAIT_PLAYERS);
        ctx.body = { races: data, pagination: {} };
    },

    async getRace(ctx) {
        const race = await raceRepository.getRaceById(ctx.params.id);

        if (!race) {
            throw new NotFoundException(errorMessages.raceNotFound);
        }

        ctx.body = race;
    },

    async createRace(ctx) {
        const race = await (new Race()).save();

        await notify(gameActions.mainTypes.NEW_RACE_CREATED, { race });

        ctx.body = raceFormatter.get(race);
        ctx.status = 201;
    },
};
