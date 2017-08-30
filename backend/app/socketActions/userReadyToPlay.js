const _ = require('lodash');
const { Race } = require('mongoose').models;
const { mainTypes, gameErrors, gameTypes } = require('../../config/gameTypes');
const raceRepository = require('../repositories/raceRepository');
const { notify } = require('../services/notifyService');

module.exports = async (io, player, action) => {
    player.set('readyToPlay', true);
    await player.save();

    const race = await raceRepository.getRaceById(player.raceId);

    if (race === null) {
        notify(gameTypes.READY_TO_PLAY_ERROR, { error: gameErrors.RACE_NOT_FOUND }, player.socketId);
        return;
    }

    if (race.status !== Race.statuses.WAIT_PLAYERS) {
        notify(gameTypes.READY_TO_PLAY_ERROR, { error: gameErrors.GAME_ALREADY_STARTED }, player.socketId);
        return;
    }

    notify(gameTypes.USER_CHANGE_READY_STATUS, { player: player.toJson() }, player.raceId);
    notify(gameTypes.READY_TO_PLAY_SUCCESS, {}, player.socketId);
    if (race.isAllPlayersReadyToPlay()) {
        race.startGame();
        await race.save();

        race.getPlayers().forEach(async (pl) => {
            await pl.startGame();
            const gameState = await race.getGameState(pl);
            notify(gameTypes.START_GAME, gameState, pl.socketId);
        });

        notify(mainTypes.RACE_CHANGED, { race: race.toJson() });
    }
};
