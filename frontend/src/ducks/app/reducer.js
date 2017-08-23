import actions from './actions';

export { actions };

export default function app(state = {}, action) {
    switch (action.type) {
        case 'NEW_ROOM_CREATED':
            break;
        default:
            return state;
    }
}
