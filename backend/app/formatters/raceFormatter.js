module.exports = {
    get(race) {
        return {
            id: race._id,
            status: race.status,
        };
    },

    list(races) {
        return races.map(this.get);
    },
};
