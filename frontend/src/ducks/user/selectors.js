const selectors = {
    selectUserId(state) {
        return state.auth.user.id;
    },
    selectSocketId(state) {
        return state.auth.user.socketId;
    },
    selectUser(state) {
        return state.auth.user;
    }
};

export default selectors;
