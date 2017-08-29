const { Race, Text } = require('../models');
const _ = require('lodash');

module.exports = {
    async getRacesByStatus(status) {
        return Race.find({ status }).populate(['players', 'text']);
    },

    async getRaceById(raceId) {
        return Race.findById(raceId).populate(['players', 'text']);
    },

    async createRace() {
        const text = await Text.findOne();
        return (new Race({ text: text.id })).save();
    },
};
