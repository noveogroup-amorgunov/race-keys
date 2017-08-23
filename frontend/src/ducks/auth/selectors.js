const selectors = {
    selectErrorCode(state) {
        return state.auth.errorCode;
    },
    selectAuthState(state) {
        return state.auth.isAuthenticated;
    }
};

export default selectors;
