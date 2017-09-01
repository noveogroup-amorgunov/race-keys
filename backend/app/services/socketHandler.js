const logger = require('winston');
const { gameTypes } = require('../../config/gameTypes');
const playerRepository = require('../repositories/playerRepository');
const userRepository = require('../repositories/userRepository');

const {
    userLeaveRace,
    joinRaceRequest,
    userReadyToPlay,
    userMovingForward,
    userFinishRace,
    userMakeErrorInText
} = require('../socketActions');


module.exports = io => async (socket, next) => {
    logger.debug(`User connected: ${socket.id}`);
    logger.debug(`Token: ${socket.handshake.query.token}`);

    // add user to main page
    socket.join('main');

    socket.on('disconnect', async () => {
        logger.debug(`User disconnected: ${socket.id}`);
        const players = await playerRepository.getPlayersBySocketId(socket.id);
        if (players.length) {
            players.forEach(async (player) => {
                await userLeaveRace(io, player, socket);
            });
        }
    });

    socket.on('action', async (action) => {
        logger.debug(`CLIENT ACTION: ${JSON.stringify(action)}`);

        if (action.type === gameTypes.JOIN_RACE_REQUEST) {
            joinRaceRequest(io, action, socket);
            return;
        }

        let player = await playerRepository.getPlayerBySocketIdAndRace(
            socket.id,
            action.raceId
        );

        // find user by userToken and connect him to player entity
        if (!player && socket.handshake.query.token) {
            const user = await userRepository.findByNotExpiredToken(socket.handshake.query.token);

            if (user) {
                player = await playerRepository.getPlayerByRaceAndUserId(action.raceId, user.id);
            }
        }

        if (player === null) {
            logger.warn('Player doesn\'t exists: ', socket.id, action);
            return;
        }

        player.socketId = socket.id;
        await player.save();

        switch (action.type) {
            case gameTypes.READY_TO_PLAY:
                userReadyToPlay(io, player, action);
                break;
            case gameTypes.LEAVE_RACE:
                userLeaveRace(io, player, socket);
                break;
            case gameTypes.CHANGE_POSITION_REQUEST:
                userMovingForward(io, player, action);
                break;
            case gameTypes.FINISH_REQUEST:
                userFinishRace(io, player, action);
                break;
            case gameTypes.ADD_ERROR_REQUEST:
                userMakeErrorInText(io, player, action);
                break;
            default:
                logger.warn('Unknown action: ', action);
                break;
        }
    });

    next();
};
