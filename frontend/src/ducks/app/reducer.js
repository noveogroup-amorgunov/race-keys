import actions from './actions';
import types from './types';

export const initialState = {
    screenWidth: typeof window === 'object' ? window.innerWidth : null
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case types.SCREEN_RESIZE:
            return Object.assign({}, state, {
                screenWidth: action.screenWidth
            });
        default:
            return state;
    }
}
