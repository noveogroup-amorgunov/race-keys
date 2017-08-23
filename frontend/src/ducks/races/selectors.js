const selectors = {
    selectRaces(state) {
        return {
            races: state.races.items,
            pagination: state.races.pagination
        };
    },
    selectCurrentRace(state) {
        return state.races.currentRace;
    },
    selectCurrentRaceId(state) {
        return state.races.currentRace.id;
    }
};

export default selectors;
