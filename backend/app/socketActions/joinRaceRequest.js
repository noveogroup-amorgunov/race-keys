const { Player } = require('mongoose').models;
const { mainTypes, gameErrors, gameTypes } = require('../constraints/gameActions');
const playerRepository = require('../repositories/playerRepository');
const raceRepository = require('../repositories/raceRepository');
const userRepository = require('../repositories/userRepository');
const { notify } = require('../services/notifyService');

const maxPlayersInOneRace = 8;

module.exports = async (io, action, socket) => {
    const {
        raceId,
        socketId,
    } = action;

    const updateSocket = socketId !== socket.id;
    const race = await raceRepository.getRaceById(raceId);

    if (race === null) {
        notify(mainTypes.JOIN_RACE_ERROR, { error: gameErrors.RACE_NOT_FOUND }, socket.id);
        return;
    }

    // find player by room and socketId
    let player = await playerRepository.getPlayerBySocketId(socketId);

    // find user by userToken and connect him to player entity
    if (!player && socket.handshake.query.token) {
        const user = await userRepository.findByNotExpiredToken(socket.handshake.query.token);
        player = await playerRepository.getPlayerByRaceAndUserId(race.id, user.id);
    }

    // TODO: change socketId -> if user reload page with game
    let gameState;

    switch (race.status) {
        case race.statuses.WAIT_PLAYERS:
            if (!player && race.players.length >= maxPlayersInOneRace) {
                notify(mainTypes.JOIN_RACE_ERROR, { error: gameErrors.RACE_FULL }, socket.id);
                return;
            }
            // TODO: delete player in userLeaveRace.js
            // update socketId
            // if (player) {
            // } else {}

            player = new Player({});
            await player.save();

            await playerRepository.addPlayer(socket.id, player.id);

            await race.addPlayer(player).save();

            socket.join(raceId);
            gameState = await race.getGameState(player);

            notify(mainTypes.JOIN_RACE_SUCCESS, { gameState, socketId: socket.id }, socket.id);
            notify(mainTypes.RACE_CHANGED, { race: race.toJson() });
            notify(mainTypes.USER_ENTERED_RACE, { player: player.toJson() }, player.raceId);
            break;
        case race.statuses.IN_PROCESS:
            if (player === null) {
                notify(mainTypes.JOIN_RACE_ERROR, { error: gameErrors.PLAYER_NOT_FOUND }, socket.id);
                return;
            }

            // delete old user socketId and add new socketId
            await playerRepository.removePlayerBySocketId(socketId);
            await playerRepository.addPlayer(socket.id, player.id);

            gameState = await race.getGameState(player);

            socket.join(raceId);

            notify(mainTypes.USER_ENTERED_RACE, { player: player.toJson() }, player.raceId);
            notify(mainTypes.JOIN_RACE_SUCCESS, gameState, socket.id);

            break;
        case race.statuses.FINISHED:
            if (player === null) {
                notify(mainTypes.JOIN_RACE_ERROR, { error: gameErrors.PLAYER_NOT_FOUND }, socket.id);
                return;
            }

            gameState = await race.getGameState(player);
            notify(gameTypes.GAME_OVER, gameState, socket.id);
            break;
        default:
    }
};
