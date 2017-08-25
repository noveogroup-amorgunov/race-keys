const { Race } = require('mongoose').models;
const { mainTypes, gameErrors, gameTypes } = require('../constraints/gameActions');
const raceRepository = require('../repositories/raceRepository');
const { notify } = require('../services/notifyService');

module.exports = async (io, player, action) => {
    const race = await raceRepository.getRaceById(player.raceId);

    if (race === null) {
        notify(mainTypes.ADD_ERROR_ERROR, { error: gameErrors.RACE_NOT_FOUND }, player.socketId);
        return;
    }

    if (race.status !== Race.statuses.IN_PROCESS) {
        notify(mainTypes.ADD_ERROR_ERROR, { error: gameErrors.GAME_NOT_STARTED }, player.socketId);
        return;
    }

    await player.makeErrorInText().save();
    const commonGameState = await race.getCommonGameState();

    notify(gameTypes.ADD_ERROR_SUCCESS, { player: player.toJson() }, player.socketId);
    notify(gameTypes.PLAYERS_CHANGE_STATE, { data: commonGameState }, player.roomId);
};
