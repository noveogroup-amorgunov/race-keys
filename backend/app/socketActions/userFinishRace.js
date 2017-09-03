const { Race, User } = require('mongoose').models;
const { mainTypes, gameErrors, gameTypes } = require('../../config/gameTypes');
const raceRepository = require('../repositories/raceRepository');
const { notify } = require('../services/notifyService');

module.exports = async (io, player, action) => {
    const race = await raceRepository.getRaceById(player.raceId);

    if (race === null) {
        notify(mainTypes.CHANGE_POSITION_ERROR, { error: gameErrors.RACE_NOT_FOUND }, player.socketId);
        return;
    }

    if (race.status !== Race.statuses.IN_PROCESS) {
        notify(mainTypes.CHANGE_POSITION_ERROR, { error: gameErrors.GAME_NOT_STARTED }, player.socketId);
        return;
    }

    const { player: updatedPlayer } = await race.playerFinishRace(player);

    if (updatedPlayer.user && updatedPlayer.finished) {
        const user = await User.findById(updatedPlayer.user);
        const racesAlreadyPlayed = user.game.races;
        const averageSpeed = ((user.game.averageSpeed * racesAlreadyPlayed) + updatedPlayer.speed) / (racesAlreadyPlayed + 1);

        // update user stats
        user.game = {
            races: racesAlreadyPlayed + 1,
            averageSpeed,
            maxSpeed: Math.max(user.game.maxSpeed, updatedPlayer.speed),
        };
        await user.save();
    }

    const commonGameState = await race.getCommonGameState();

    notify(gameTypes.FINISH_SUCCESS, { player: updatedPlayer.toJson() }, player.socketId);
    notify(gameTypes.PLAYERS_CHANGE_STATE, { data: commonGameState }, player.raceId);

    if (race.status === Race.statuses.FINISHED) {
        notify(gameTypes.GAME_OVER, { data: race.toJson() }, player.raceId);
    }
};
