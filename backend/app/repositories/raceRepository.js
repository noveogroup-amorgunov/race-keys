const { Race, Text, Player } = require('../models');
const _ = require('lodash');

module.exports = {
    async getRacesByStatus(status) {
        return Race
            .find({ status })
            .populate(['players', 'text']);
    },

    async getNotFinishedRacesByUser(user) {
        const userPlayers = await Player.find({ user, finished: { $ne: true } });
        return Race
            .find({ $or: [
                {
                    status: Race.statuses.IN_PROCESS,
                    players: { $in: userPlayers.map(player => player.id) },
                },
                {
                    status: Race.statuses.WAIT_PLAYERS,
                }
            ] })
            .sort('status')
            .populate(['players', 'text']);
    },

    async getRaceById(raceId) {
        return Race
            .findById(raceId)
            .populate(['players', 'text']);
    },

    async createRace() {
        const text = await Text.findOne();
        const race = await (new Race({ text: text.id })).save();

        return Race
            .findById(race.id)
            .populate(['players', 'text']);
    },
};
