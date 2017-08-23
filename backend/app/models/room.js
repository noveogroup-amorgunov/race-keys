const mongoose = require('mongoose');

const statuses = {
    IN_PROCESS: 1,
    WAIT_PLAYERS: 2,
    FINISHED: 3,
};

const types = {
    SIMPLE: 1,
};

const roomSchema = mongoose.Schema({
    start: Date,
    end: Date,
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: {
        type: Number,
        enum: Object.values(statuses),
        default: statuses.WAIT_PLAYERS,
    },
    type: {
        type: Number,
        enum: Object.values(types),
        default: types.SIMPLE,
    },
}, {
    timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

Room.statuses = Object.freeze(statuses);
Room.types = Object.freeze(types);

module.exports = Room;
