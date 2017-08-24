const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    readyToPlay: {
        type: Boolean,
        default: false,
    },
    race: { type: mongoose.Schema.Types.ObjectId, ref: 'Race' },
    place: Number,
    position: Number,
    errorsInPrint: Number,
    finished: {
        type: Boolean,
        default: false,
    },
    finishedTime: Date,
    socketId: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
