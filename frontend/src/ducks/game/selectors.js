const selectors = {
    selectRaceState(state) {
        return {
            my: state.game.my,
            players: state.game.players,
            playerPositions: state.game.playerPositions,
            status: state.game.status,
            startedAt: state.game.startedAt,
            end: state.game.end,
        };
    },
};

export default selectors;
