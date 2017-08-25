const { Player } = require('mongoose').models;
const redis = require('../../bootstrap/redis');

module.exports = {
    async addPlayer(socketId, playerId) {
        return redis.getClient().hsetAsync('players', socketId, playerId);
    },
    async getPlayerBySocketId(socketId) {
        console.log('player::getPlayerBySocketId');
        const playerId = await redis.getClient().hgetAsync('players', socketId);

        if (!playerId) {
            return null;
        }

        return Player.findById(playerId);
    },
    async removePlayerBySocketId(socketId) {
        // TODO: remove from race ?
        return redis.getClient().hdelAsync('players', socketId);
    },
    async getPlayerByRaceAndUserId(raceId, userId) {
        console.log('player::getPlayerByRaceAndUserId');
        return Player.findOne({ race: raceId, user: userId });
        // return Promise.resolve(null);
    },

};
