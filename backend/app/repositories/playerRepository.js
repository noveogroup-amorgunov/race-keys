const { Player } = require('../models');

module.exports = {
    async createPlayer(socketId, user) {
        const player = new Player({ socketId, user, name: (user ? user.login : 'Guest') });
        return player.save();
    },
    async getPlayerBySocketId(socketId) {
        return Player.findOne({ socketId });
    },
    async removePlayerBySocketId(socketId) {
        return Player.remove({ socketId });
    },
    async getPlayerByRaceAndUserId(raceId, userId) {
        return Player.findOne({ race: raceId, user: userId });
    },
};
