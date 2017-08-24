const { Player } = require('mongoose').models;
const { mainTypes, gameErrors, gameTypes } = require('../constraints/gameActions');
const raceRepository = require('../repositories/raceRepository');
const { notify } = require('../services/notifyService');

const maxPlayersInOneRace = 8;

module.exports = async (io, action, socket) => {
    const {
        raceId,
        socketId,
        // userToken,
    } = action;

    const race = await raceRepository.getRaceById(raceId);

    if (race === null) {
        notify(mainTypes.JOIN_RACE_ERROR, { error: gameErrors.RACE_NOT_FOUND }, socketId);
        return;
    }

    // TODO: find player by room and socketId

    // TODO: find uesr by userToken and connect him to player entity
    // TODO: change socketId -> if user reload page with game
    const player = new Player({ socketId });
    await player.save();

    const gameState = await race.getGameState(player);

    switch (race.status) {
        case race.statuses.WAIT_PLAYERS:
            if (race.players.length >= maxPlayersInOneRace) {
                notify(mainTypes.JOIN_RACE_ERROR, { error: gameErrors.RACE_FULL }, socketId);
                return;
            }

            await race.addPlayer(player);
            await race.save();

            socket.join(raceId);

            notify(mainTypes.RACE_CHANGED, { race });
            notify(mainTypes.USER_ENTERED_RACE, { player }, player.raceId);
            notify(mainTypes.JOIN_RACE_SUCCESS, gameState, socketId);
            break;
        case race.statuses.IN_PROCESS:
            if (player === null) {
                notify(mainTypes.JOIN_RACE_ERROR, { error: gameErrors.PLAYER_NOT_FOUND }, socketId);
                return;
            }

            socket.join(raceId);
            notify(mainTypes.USER_ENTERED_RACE, { player }, player.raceId);
            notify(mainTypes.JOIN_RACE_SUCCESS, gameState, socketId);

            break;
        case race.statuses.FINISHED:
            if (player === null) {
                notify(mainTypes.JOIN_RACE_ERROR, { error: gameErrors.PLAYER_NOT_FOUND }, socketId);
                return;
            }
            notify(gameTypes.GAME_OVER, gameState, socketId);
            break;
        default:
    }
};
