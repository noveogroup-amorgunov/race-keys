const logger = require('winston');
const { mainTypes, gameTypes } = require('../../config/gameTypes');
const playerRepository = require('../repositories/playerRepository');

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

    // if (!socket.handshake.query.token) {
    //     return next(new SocketException(socket, 'unauthorized'));
    // }

    // add user to main page
    socket.join('main');

    socket.on('disconnect', async () => {
        logger.debug(`User disconnected: ${socket.id}`);
        const player = await playerRepository.getPlayerBySocketId(socket.id);
        if (player !== null) {
            await userLeaveRace(io, player, socket);
        }
    });

    socket.on('action', async (action) => {
        logger.debug(`New action from client: ${JSON.stringify(action)}`);

        if (action.type === mainTypes.JOIN_RACE_REQUEST) {
            joinRaceRequest(io, action, socket);
            return;
        }

        const player = await playerRepository.getPlayerBySocketId(socket.id);

        if (player === null) {
            logger.warn('Player doesn\'t exists: ', socket.id, action);
            return;
        }

        player.socketId = socket.id;

        switch (action.type) {
            case gameTypes.READY_TO_PLAY:
                userReadyToPlay(io, player, action);
                break;
            case mainTypes.LEAVE_RACE:
                userLeaveRace(io, player, socket);
                break;
            case gameTypes.CHANGE_POSITION_REQUEST:
                userMovingForward.putCardRequest(io, player, action);
                break;
            case gameTypes.FINISH_REQUEST:
                userFinishRace.putCardFromPackRequest(io, player, action);
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
