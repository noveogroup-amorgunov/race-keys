import types from './types';

export const initialState = {
    id: null,
    login: null,
    socketId: null,
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_USER_SUCCESS:
            return {
                ...action.user,
            };
        default:
            return state;
    }
}
