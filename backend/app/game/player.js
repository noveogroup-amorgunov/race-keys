const _ = require('lodash');

// const { cardColors } = require('../constraints/game-actions');
const redis = require('../../bootstrap/redis');
const { Player: PlayerModel } = require('mongoose').models;

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

class Player {
    constructor(data) {
        this.socketId = data.socketId;
        this.userId = data.userId;
        this.data = this.reset(data);
        return this;
    }

    reset(data) {
        return {
            readyToPlay: data.readyToPlay,
            room: data.room,
            place: data.place,
            position: data.position || 0,
            errors: data.errors || 0,
            finished: data.finished,
            finishedTime: data.time,
        };
    }

    isFinished() {
        return this.data.finished;
    }

    static async getAllOnlinePlayers() {
        const players = await redis.getClient().hgetallAsync('players');
        return players.map(data => new Player(JSON.parse(data)));
    }

    static async getPlayerBySocketId(socketId) {
        console.log('player::getPlayerBySocketId');
        const player = await redis.getClient().hgetAsync('players', socketId);
        
        console.log(player, socketId);

        if (!player) {
            return null;
        }

        return new Player(Object.assign({ socketId }, JSON.parse(player)));
    }

    static async removePlayerBySocketId(socketId) {
        const player = await Player.getPlayerBySocketId(socketId);
        if (player) {
            return player.remove();
        }
    }

    toJson() {
        return JSON.stringify(this);
    }

    async startGame() {
        this.reset();
        return this.save();
    }

    async save() {
        await redis.getClient().hsetAsync('players', this.socketId, this.toJson());
        return this;
    }

    async remove() {
        return redis.getClient().hdelAsync('players', this.socketId);
    }

    async setRoom(roomId) {
        this.data.room = roomId;
        return this.save();
    }

    readyToPlay() {
        this.data.readyToPlay = true;
        return this.save();
    }

    async changePosition(position) {
        this.data.position = position;
        return this.save();
    }

    async finish(place, time) {
        this.data.place = place;
        this.data.finished = true;
        this.data.finishedTime = time;
        return this.save();
    }

    async addError() {
        this.data.errors += 1;
        return this.save();
    }
}

module.exports = Player;
