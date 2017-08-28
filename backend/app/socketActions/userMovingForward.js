const { Race } = require('mongoose').models;
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

    await player.changePositionInText(action.position).save();
    const commonGameState = await race.getCommonGameState();

    notify(gameTypes.CHANGE_POSITION_SUCCESS, { player: player.toJson() }, player.socketId);
    notify(gameTypes.PLAYERS_CHANGE_STATE, { data: commonGameState }, player.roomId);
};
