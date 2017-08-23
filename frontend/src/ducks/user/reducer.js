import types from './types';
import service from './service';
import actions from './actions';
import selectors from './selectors';

const initialState = {
    id: null,
    login: null,
    socketId: null,
};

export {
    service,
    types,
    actions,
    selectors,
    initialState
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
