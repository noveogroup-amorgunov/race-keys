import { LOCAL_STORAGE_KEY } from '@/constants';

const selectors = {
    selectErrorCode(state) {
        return state.auth.errorCode;
    },
    selectAuthState(state) {
        return state.auth.isAuthenticated;
    },
};

export default selectors;
