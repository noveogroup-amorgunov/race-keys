const { Player } = require('../models');

module.exports = {
    async createPlayer(socketId, user) {
        const player = new Player({ socketId, user, name: (user ? user.login : 'Guest') });
        return player.save();
    },
    async getPlayerBySocketId(socketId) {
        return Player.findOne({ socketId });
    },
    async getPlayerBySocketIdAndRace(socketId, race) {
        return Player.findOne({ socketId, race });
    },
    async getPlayersBySocketId(socketId) {
        return Player.find({ socketId });
    },
    async removePlayerBySocketIdAndRace(socketId, race) {
        return Player.remove({ socketId, race });
    },
    async getPlayerByRaceAndUserId(raceId, userId) {
        return Player.findOne({ race: raceId, user: userId });
    },
};
