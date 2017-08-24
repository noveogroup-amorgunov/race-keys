const { Race } = require('mongoose').models;
const _ = require('lodash');

module.exports = {
    async getRacesByStatus(status) {
        return Race.find({ status });
    },

    async getRaceById(raceId) {
        return Race.findById(raceId);
    },
};
