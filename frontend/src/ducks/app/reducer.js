import actions from './actions';

export { actions };

export const initialState = {};

export default function app(state = initialState, action) {
    switch (action.type) {
        case 'NEW_ROOM_CREATED':
            break;
        default:
            return state;
    }
}
