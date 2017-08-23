import actions from './actions';

export { actions };

export default function app(state = {}, action) {
    console.log(action);
    switch (action.type) {
        case 'NEW_ROOM_CREATED':
        default:
            return state;
    }
}
