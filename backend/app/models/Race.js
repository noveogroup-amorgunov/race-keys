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

raceSchema.methods.getPlayers = function getPlayers() {
    return this.players;
};

raceSchema.methods.toJson = function toJson() {
    return {
        id: this._id,
        startedAt: this.startedAt,
        createdAt: this.createdAt,
        text: this.text.text,
        textSource: this.text.source,
        players: this.getPlayers().map(player => player.toJson()),
        status: this.status,
    };
};

raceSchema.methods.addPlayer = async function addPlayer(player) {
    if (this.players.map(p => p.id).includes(player.id)) {
        return;
    }

    this.players.push(player);
    await player.setRace(this.id).save();
    return Promise.resolve(this);
};

raceSchema.methods.removePlayer = async function removePlayer(player) {
    await player.setRace(null);
    this.players = this.players.filter(item => item.id !== player.id);
    return this;
};

raceSchema.methods.getPlayersIds = function getPlayersIds() {
    return this.players.map(p => p.id);
};

raceSchema.methods.getPlayers = function getPlayers() {
    return this.players;
};

raceSchema.methods.startGame = function startGame() {
    this.status = statuses.IN_PROCESS;
    this.startedAt = new Date();
    return this;
};

raceSchema.methods.endGame = function endGame() {
    this.status = statuses.FINISHED;
    return this;
};

raceSchema.methods.playerFinishRace = async function playerFinishRace(player) {
    // get count of already finished players
    const finishedPlayerCount = this.players
        .reduce((acc, p) => p.isFinished(), 0);

    const playPeriod = Date.now() - +this.startedAt;
    const speed = (this.text.text.length * 1000 * 60) / (playPeriod);

    player.finish(finishedPlayerCount + 1, playPeriod, speed);
    await player.save();

    // if all player finished, end game
    if (finishedPlayerCount + 1 >= this.players.length) {
        this.endGame();
        await this.save();
    }
    return { player };
};

raceSchema.methods.isAllPlayersReadyToPlay = function isAllPlayersReadyToPlay() {
    if (!this.players.length) {
        return false;
    }
    return this.players.every(player => player.readyToPlay);
};

raceSchema.methods.isEmptyRace = function isEmptyRace() {
    return !this.players.length;
};

raceSchema.methods.getGameState = function getGameState(player) {
    const players = this.getPlayers();

    return {
        me: player.toJson(),
        others: players
            .filter(p => p.id !== player.id)
            .map(p => p.toJson()),
        game: this.toJson(),
    };
};

raceSchema.methods.getCommonGameState = async function getCommonGameState() {
    await this.updatePlayersData();
    const players = this.getPlayers();

    return {
        players: players.map(p => p.toJson()),
        game: this.toJson(),
    };
};

raceSchema.methods.updatePlayersData = async function updatePlayersData() {
    this.players = this.players.map(async (player) => {
        return mongoose.models.Player.findById(player.id);
    });
    await this.save;
};

raceSchema.methods.isInProcess = function isInProcess() {
    return this.status === statuses.IN_PROCESS;
};

raceSchema.methods.isWaitPlayers = function isWaitPlayers() {
    return this.status === statuses.WAIT_PLAYERS;
};

raceSchema.methods.isFinished = function isFinished() {
    return this.status === statuses.FINISHED;
};

const Race = mongoose.model('Race', raceSchema);

Race.statuses = Object.freeze(statuses);
Race.types = Object.freeze(types);

module.exports = Race;
