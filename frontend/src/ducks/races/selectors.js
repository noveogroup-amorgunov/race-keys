const selectors = {
    isFetchedRaces(state) {
        return state.races.items.length;
    },
    selectRaces(state) {
        return {
            races: state.races.items,
        };
    },
    selectErrorCode(state) {
        return state.races.errorCode;
    },
    selectCurrentRace(state) {
        return state.races.currentRace;
    },
    selectCurrentRaceState(state) {
        return state.races.currentRaceState;
    },
    selectCurrentRaceId(state) {
        return state.races.currentRace && state.races.currentRace.id;
    }
};

export default selectors;
