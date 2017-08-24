const mongoose = require('mongoose');

const statuses = {
    IN_PROCESS: 1,
    WAIT_PLAYERS: 2,
    FINISHED: 3,
};

const types = {
    SIMPLE: 1,
};

const raceSchema = mongoose.Schema({
    startedAt: Date,
    text: { type: mongoose.Schema.Types.ObjectId, ref: 'Text' },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
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

const Race = mongoose.model('Race', raceSchema);

Race.statuses = Object.freeze(statuses);
Race.types = Object.freeze(types);

module.exports = Race;
