const { Player } = require('../models');
const userRepository = require('./userRepository');

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
    async getPlayerWithUser({ socketId, raceId, userToken }) {
        // find player by room and socketId
        let player = await this.getPlayerBySocketIdAndRace(socketId, raceId);
        let user;

        // find user by userToken and connect him to player entity
        if (!player && userToken) {
            user = await userRepository.findByNotExpiredToken(userToken);
            if (user) {
                player = await this.getPlayerByRaceAndUserId(raceId, user.id);
            }
        }
        return { player, user };
    },
};
