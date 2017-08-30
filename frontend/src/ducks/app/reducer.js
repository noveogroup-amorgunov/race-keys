import actions from './actions';

export { actions };

export const initialState = {};

export default function app(state = initialState, action) {
    switch (action.type) {
        // test action
        case 'NEW_RACE_CREATED':
            break;
        default:
            return state;
    }
}
