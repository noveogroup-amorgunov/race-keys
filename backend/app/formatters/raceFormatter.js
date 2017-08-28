module.exports = {
    get(race) {
        return race.toJson();
    },

    list(races) {
        return races.map(this.get);
    },
};
