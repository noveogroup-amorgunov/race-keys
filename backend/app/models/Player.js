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
    speed: Number,
    finishedTime: Number,
    socketId: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    carModel: String,
    racesCount: Number,
    averageSpeed: Number,
    name: {
        type: String,
        default: 'Guest'
    }
}, {
    timestamps: true,
});

playerSchema
    .virtual('raceId')
    .get(function get() {
        return this.race;
    });

// TODO: refactoring this method
playerSchema.methods.startGame = function startGame() {
    return this.finished;
};

playerSchema.methods.isFinished = function isFinished() {
    return this.finished;
};

playerSchema.methods.toJson = function toJson() {
    return {
        id: this.id,
        readyToPlay: this.readyToPlay,
        race: this.race,
        place: this.place,
        position: this.position,
        errorsInPrint: this.errorsInPrint,
        finished: this.finished,
        finishedTime: this.finishedTime,
        socketId: this.socketId,
        username: this.name,
        speed: this.speed,
        carModel: this.carModel,
        racesCount: this.racesCount,
        averageSpeed: this.averageSpeed,
    };
};

playerSchema.methods.setRace = function setRace(raceId) {
    this.set('race', raceId);
    return this;
};

playerSchema.methods.ready = function ready(isReady) {
    this.set('readyToPlay', isReady);
    return this;
};

playerSchema.methods.changePositionInText = function changePositionInText(position) {
    this.set('position', position);
    return this;
};


playerSchema.methods.finish = function readyToPlay(place, time, speed) {
    this.set('finishedTime', time);
    this.set('speed', speed);
    this.set('finished', true);
    this.set('place', place);
    return this;
};

playerSchema.methods.makeErrorInText = function makeErrorInText() {
    this.set('errorsInPrint', (this.errorsInPrint || 0) + 1);
    return this;
};

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
