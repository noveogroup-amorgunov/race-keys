const selectors = {
    selectUserId(state) {
        return state.auth.user.id;
    },
    selectUser(state) {
        return state.auth.user;
    }
};

export default selectors;
