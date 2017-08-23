const
    _ = require('lodash'),
    Room = require('../game/room'),
    RoomModel = require('../models/room'),
    { createNewRoom } = require('../socket-services'),
    userRepository = require('../repositories/user-repository');

const {
    NotFoundException,
} = require('../exceptions');

module.exports = {
    async getRooms(ctx) {
        ctx.body = await Room.getAllOnlineRooms();
    },

    async getRoom(ctx) {
        const roomId = ctx.params.id;
        const room = Room.getRoom(roomId);

        if (!room) {
            throw new NotFoundException();
        }

        ctx.body = room;
    },

    async createRoom(ctx) {
        const savedRoom = await (new RoomModel()).save();

        const room = new Room({ roomId: savedRoom._id });
        await room.save();

        createNewRoom(room);

        ctx.body = room.toJson();
        ctx.status = 201;
    },
};
