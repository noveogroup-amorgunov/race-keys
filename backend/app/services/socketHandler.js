const logger = require('winston');
const { userLeaveRace, joinRaceRequest, userReadyToPlay } = require('../socket-services');
const { mainTypes, gameTypes } = require('../constraints/gameActions');
const playerRepository = require('../repositories/playerRepository');

module.exports = io => async (socket, next) => {
    console.log(`User connected: ${socket.id}`);
    // console.log(socket.request.headers);

    // add user to main page
    socket.join('main');

    socket.on('disconnect', async () => {
        console.log(`User disconnected: ${socket.id}`);
        const player = await playerRepository.getPlayerBySocketId(socket.id);
        if (player !== null) {
            await userLeaveRace(io, player, socket);
        }
    });

    socket.on('action', async (action) => {
        console.log(`New action from client: ${action}`);

        if (action.type === mainTypes.JOIN_RACE_REQUEST) {
            joinRaceRequest(io, action, socket);
            return;
        }

        const player = await playerRepository.getPlayerBySocketId(socket.id);

        if (player !== null) {
            switch (action.type) {
                case gameTypes.READY_TO_PLAY:
                    userReadyToPlay(io, player, action);
                    break;

                case mainTypes.LEAVE_RACE:
                    userLeaveRace(io, player, socket);
                    break;

                /*case gameTypes.PUT_CARD_REQUEST:
                    socketProcessors.putCardRequest(io, user, action);
                    break;

                case gameTypes.PUT_CARD_FROM_PACK_REQUEST:
                    socketProcessors.putCardFromPackRequest(io, user, action);
                    break;

                case gameTypes.GET_ONE_CARD_REQUEST:
                    socketProcessors.getOneCardRequest(io, user, action);
                    break;

                case gameTypes.GET_THREE_CARDS_REQUEST:
                    socketProcessors.getThreeCardsRequest(io, user, action);
                    break;

                case gameTypes.SHUFFLE_CARDS_REQUEST:
                    socketProcessors.shuffleCardsRequest(io, user, action);
                    break;*/
                default:
                    logger.warn('unknown action:', action);
                    break;
            }
        }
    });

    next();
};
