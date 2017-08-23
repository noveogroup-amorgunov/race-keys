const
    _ = require('lodash'),
    Room = require('../game/room'),
    Player = require('../game/player'),
    RoomModel = require('../models/room'),
    { mainTypes, gameErrors } = require('../constraints/game-actions');

module.exports = async (io, player, socket) => {
    const room = await Room.getRoom(player.roomId);

    if (room === null) {
        io.to(player.socketId).emit('action', {
            type: mainTypes.JOIN_ROOM_ERROR,
            err: gameErrors.ROOM_DOES_NOT_EXIST
        });
        return;
    }

    socket.join('main');

    if (room.status !== RoomModel.statuses.IN_PROCESS) {
        socket.leave(player.roomId);

        io.to(player.roomId).emit('action', {
            type: mainTypes.USER_LEAVES_ROOM,
            player: player.toJson(),
        });

        await room.removePlayer(player);

        if (room.players.length === 0) {
            io.to('main').emit('action', {
                type: mainTypes.ROOM_DELETED,
                roomId: room.roomId,
            });
            await room.remove();
        } else {
            io.to('main').emit('action', {
                type: mainTypes.ROOM_CHANGED,
                room
            });
        }
    }
};
