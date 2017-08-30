const mongoose = require('mongoose');

/*
// tests

const user1 = new Player({ userId }, 'awesomeSocketId');
await user1.save();

const player = await Player.getPlayerBySocketId('awesomeSocketId');
console.log(player.toJson());

const players = await Player.getAllPlayers();
constole.log(players.length);

user1.remove();

const playersAfterDelete = await Player.getAllPlayers();
constole.log(playersAfterDelete.length);
*/

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
    name: String,
}, {
    timestamps: true,
});

playerSchema
    .virtual('raceId')
    .get(function get() {
        return this.race;
    });

// TODO: refactoring these methods
playerSchema.methods.reset = function reset(data = {}) {
    this.set('readyToPlay', data.readyToPlay || false);

    this.set('place', data.place || -1);
    this.set('position', data.position || -1);
    this.set('errorsInPrint', data.errorsInPrint || 0);
    this.set('finished', data.finished || false);
    this.set('finishedTime', data.finishedTime);
    this.set('socketId', data.socketId);
    this.set('user', data.user);
};
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


playerSchema.methods.finish = function readyToPlay(place, time) {
    this.set('finishedTime', time);
    this.set('finished', true);
    this.set('place', place);
    return this;
};

playerSchema.methods.makeErrorInText = function makeErrorInText() {
    this.set('errorsInPrint', this.errorsInPrint + 1);
    return this;
};

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
