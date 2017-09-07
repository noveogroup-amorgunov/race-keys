const selectors = {
    selectScreenWidth(state) {
        return state.app.screenWidth;
    },
    selectModal(state) {
        return state.app.modal;
    }
};

export default selectors;
