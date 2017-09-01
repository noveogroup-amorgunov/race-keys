const { Race } = require('mongoose').models;
const { mainTypes, gameErrors, gameTypes } = require('../../config/gameTypes');
const playerRepository = require('../repositories/playerRepository');
const raceRepository = require('../repositories/raceRepository');
const { notify } = require('../services/notifyService');

const maxPlayersInOneRace = 8;

module.exports = async (io, action, socket) => {
    const { raceId, socketId = socket.id } = action;
    const userToken = socket.handshake.query.token;
    const race = await raceRepository.getRaceById(raceId);

    if (race === null) {
        notify(gameTypes.JOIN_RACE_ERROR, { error: gameErrors.RACE_NOT_FOUND }, socket.id);
        return;
    }

    let { player, user } = await playerRepository.getPlayerWithUser({ socketId, raceId, userToken });
    let gameState;

    switch (race.status) {
        case Race.statuses.WAIT_PLAYERS:
            if (!player && race.players.length >= maxPlayersInOneRace) {
                notify(mainTypes.JOIN_RACE_ERROR, { error: gameErrors.RACE_FULL }, socket.id);
                return;
            }

            player = await playerRepository.createPlayer(socket.id, user);

            await race.addPlayer(player);
            await race.save();

            socket.join(raceId);
            gameState = await race.getGameState(player);

            notify(gameTypes.JOIN_RACE_SUCCESS, { gameState, socketId: socket.id }, socket.id);
            notify(mainTypes.RACE_CHANGED, { race: race.toJson() });
            notify(mainTypes.USER_ENTERED_RACE, { player: player.toJson() }, player.raceId);
            break;
        case Race.statuses.IN_PROCESS:
            if (player === null) {
                notify(gameTypes.JOIN_RACE_ERROR, { error: gameErrors.PLAYER_NOT_FOUND }, socket.id);
                return;
            }

            // delete old user socketId and add new socketId
            player.set('socketId', socket.id);
            await player.save();

            gameState = await race.getGameState(player);

            socket.join(raceId);

            notify(gameTypes.JOIN_RACE_SUCCESS, { gameState, socketId: socket.id }, socket.id);
            notify(mainTypes.USER_ENTERED_RACE, { player: player.toJson() }, player.raceId);
            break;
        case Race.statuses.FINISHED:
            if (player === null) {
                notify(gameTypes.JOIN_RACE_ERROR, { error: gameErrors.PLAYER_NOT_FOUND }, socket.id);
                return;
            }

            gameState = await race.getGameState(player);
            notify(gameTypes.GAME_OVER, gameState, socket.id);
            break;
        default:
    }
};
