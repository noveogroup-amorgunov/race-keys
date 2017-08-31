const { Player, Race } = require('mongoose').models;
const { mainTypes, gameErrors, gameTypes } = require('../../config/gameTypes');
const playerRepository = require('../repositories/playerRepository');
const raceRepository = require('../repositories/raceRepository');
const userRepository = require('../repositories/userRepository');
const { notify } = require('../services/notifyService');

const maxPlayersInOneRace = 8;

module.exports = async (io, action, socket) => {
    const raceId = action.raceId;
    const socketId = action.socketId || socket.id;
    let user;

    const race = await raceRepository.getRaceById(raceId);

    if (race === null) {
        notify(gameTypes.JOIN_RACE_ERROR, { error: gameErrors.RACE_NOT_FOUND }, socket.id);
        return;
    }

    // find player by room and socketId
    let player = await playerRepository.getPlayerBySocketIdAndRace(socketId, raceId);

    // find user by userToken and connect him to player entity
    if (!player && socket.handshake.query.token) {
        user = await userRepository.findByNotExpiredToken(socket.handshake.query.token);
        if (user) {
            player = await playerRepository.getPlayerByRaceAndUserId(race.id, user.id);
        }
    }

    // TODO: change socketId -> if user reload page with game
    let gameState;

    switch (race.status) {
        case Race.statuses.WAIT_PLAYERS:
            if (!player && race.players.length >= maxPlayersInOneRace) {
                notify(mainTypes.JOIN_RACE_ERROR, { error: gameErrors.RACE_FULL }, socket.id);
                return;
            }
            // TODO: delete player in userLeaveRace.js
            // update socketId
            // if (player) {
            // } else {}

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
            setTimeout(() =>
                notify(mainTypes.USER_ENTERED_RACE, { player: player.toJson() }, player.raceId),
                50);

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
