const _ = require('lodash');
const Room = require('../game/room');
const RoomModel = require('../models/room');
const { createNewRoom } = require('../socket-services');
const userRepository = require('../repositories/user-repository');

const {
    NotFoundException,
} = require('../exceptions');

module.exports = {
    async getRooms(ctx) {
        const data = await Room.getAllOnlineRooms();
        ctx.body = { races: data, pagination: {} };
    },

    async getRoom(ctx) {
        const roomId = ctx.params.id;
        const room = await Room.getRoom(roomId);

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
