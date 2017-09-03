const { Player, Car } = require('../models');
const userRepository = require('./userRepository');

module.exports = {
    async createPlayer(socketId, user) {
        const data = { socketId, user };

        const car = await (user && user.game.car ?
            Car.findById(user.game.car) :
            Car.getRandom());
        data.carModel = car.model;

        if (user) {
            data.name = user.login;
            data.racesCount = user.game.races;
            data.averageSpeed = user.game.averageSpeed;
        }

        const player = new Player(data);
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
        // find player by raceId and socketId
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
