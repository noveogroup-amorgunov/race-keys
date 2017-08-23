const
    _ = require('lodash'),
    Player = require('../game/player'),
    { userLeavesRoom } = require('../socket-services');

module.exports = io => async (socket, next) => {
    console.log('a user connected: ' + socket.id);
    console.log(socket.request.headers);

    const player = await Player.getPlayerBySocketId(socket.id);

    // add user to main page
    socket.join('main');

    socket.on('disconnect', async () => {
        console.log('a user disconnected: ' + socket.id);
        const player = await Player.getPlayerBySocketId(socket.id);
        if (player !== null) {
            await userLeavesRoom(io, player, socket);
        }
        // await socket.quit();
    });

    next();

    /* client.on('action', async (action) => {
        console.log(action);

        // joinRoomRequest обрабатываем отдельно, потому что в нем инициализируется Player/user
        if (action.type === mainTypes.JOIN_ROOM_REQUEST) {
            socketProcessors.joinRoomRequest(io, action, client);
            return;
        }

        const user = await Player.getPlayerBySocketId(client.id);
        if (user !== null) {
            console.log('user: ', user.name);
            switch (action.type) {
                case gameTypes.PUT_CARD_REQUEST:
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
                    break;

                case gameTypes.READY_TO_PLAY:
                    socketProcessors.userReadyToPlay(io, user, action);
                    break;

                case mainTypes.LEAVE_ROOM:
                    socketProcessors.userLeavesRoom(io, user, client);
                    break;

                default:
                    console.log('unknown action:', action);
                    break;
            }
        }
    });*/
};
