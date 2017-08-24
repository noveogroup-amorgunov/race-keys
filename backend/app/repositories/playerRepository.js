const { Player } = require('mongoose').models;

module.exports = {
    async getPlayerBySocketId(socketId) {
        return Promise.resolve(null);
    },
};
