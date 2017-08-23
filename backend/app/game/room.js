const
    _ = require('lodash'),
    Player = require('./player'),
    redis = require('../../bootstrap/redis'),
    { Room: RoomModel } = require('mongoose').models;

class Room {
    constructor(data) {
        this.roomId = data.roomId;
        this.data = this.reset(data);
        return this;
    }

    reset(data) {
        return {
            players: data.players || [],
            playerPositions: data.playerPositions || [],
            status: data.status || RoomModel.statuses.WAIT_PLAYERS,
            startedAt: null,
        };
    }

    static async getRoom(roomId) {
        console.log('room::getRoom');

        const data = await redis.getClient().hgetAsync('rooms', roomId);
        if (!data) {
            return null;
        }
        return new Room(JSON.parse(data));
    }

    static async getAllOnlineRoomsKeys() {
        return redis.getClient().hkeysAsync('rooms');
    }

    static async getAllOnlineRooms() {
        const rooms = await redis.getClient().hvalsAsync('rooms');
        return rooms.map(data => new Room(JSON.parse(data)));
    }

    toJson() {
        return JSON.stringify(this);
    }

    async save() {
        await redis.getClient().hsetAsync('rooms', this.roomId, this.toJson());
        return this;
    }

    async addPlayer(player) {
        if (this.players.includes(player.socketId)) {
            return;
        }
        this.players.push(player.socketId);
        await player.setRoom(this.roomId);
        return this;
    }

    async removePlayer(player) {
        await player.setRoom(null);
        this.players = this.players.filter(item => item !== player.socketId);
        return this.save();
    }

    async getPlayersIds() {
        return this.players;
    }

    async getPlayerBySocketId(socketId) {
        return Player.getPlayerBySocketId(socketId);
    }

    async getPlayers() {
        const playerSocketIds = this.getPlayersIds();
        return Promise.all(playerSocketIds.map(async (socketId) => {
            return Player.getPlayerBySocketId(socketId);
        }));
    }

    async remove() {
        const players = await this.getPlayers();
        players.forEach(player => this.removePlayer(player));

        return redis.getClient().hdelAsync('rooms', this.id);
    }

    async startGame() {
        this.data.status = RoomModel.statuses.IN_PROCESS;
        return this.save();
    }

    async playerFinishRace(socketId) {
        const player = await this.getPlayerBySocketId(socketId);
        const players = await this.getPlayers();

        // get count of already finished players
        const finishedPlayerCount = players
            .reduce((acc, p) => p.isFinished(), 0);

        const playPeriod = Date.now() - this.data.startedAt;
        await player.finish(finishedPlayerCount + 1, playPeriod);

        // if all player finished, end game
        if (finishedPlayerCount + 1 === players.length) {
            return this.endGame();
        }

        return this.save();
    }

    async endGame() {
        this.data.status = RoomModel.statuses.FINISHED;
        this.data.startedAt = Date.now();
        return this.save();
    }

    async isAllPlayersReadyToPlay() {
        const players = await this.getPlayers();
        if (!players.legnth) {
            return false;
        }
        return players.every(player => player.data.readyToPlay);
    }

    async getGameState(player) {
        const room = await Room.getRoom(player.room);

        if (!room) {
            return;
        }

        const players = await room.getPlayers();

        return {
            me: { data: player.data },
            others: players
                .filter(p => p.socketId !== player.socketId)
                .map(p => ({ user: p.userData, data: p.data })),
            game: this.data,
        };
    }
}

module.exports = Room;
