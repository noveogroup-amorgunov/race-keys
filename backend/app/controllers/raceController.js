const raceRepository = require('../repositories/raceRepository');
const raceFormatter = require('../formatters/raceFormatter');
const errorMessages = require('../../config/errorMessages');
const { notify } = require('../services/notifyService');
const { NotFoundException } = require('../exceptions');
const gameActions = require('../../config/gameTypes');
const { Race } = require('../models');

module.exports = {
    async getOpenRaces(ctx) {
        const data = await raceRepository.getRacesByStatus(Race.statuses.WAIT_PLAYERS);
        ctx.body = { races: raceFormatter.list(data) };
        ctx.state.meta = {};
    },

    async getRace(ctx) {
        const race = await raceRepository.getRaceById(ctx.params.id);

        if (!race) {
            throw new NotFoundException(errorMessages.raceNotFound);
        }

        ctx.body = raceFormatter.get(race);
    },

    async createRace(ctx) {
        const race = await raceRepository.createRace();
        await notify(gameActions.mainTypes.NEW_RACE_CREATED, { race });

        ctx.body = raceFormatter.get(race);
        ctx.status = 201;
    },
};
