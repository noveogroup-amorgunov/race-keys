const { Race } = require('mongoose').models;
const { mainTypes, gameErrors, gameTypes } = require('../constraints/gameActions');
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
    const commonGameState = await race.getCommonGameState();

    notify(gameTypes.FINISH_SUCCESS, { data: updatedPlayer.toJson() }, player.socketId);
    notify(gameTypes.PLAYERS_CHANGE_STATE, { data: commonGameState }, player.roomId);
};
