import _ from 'lodash';
import actionTypes from './types';

export const initialState = {
    rooms: [],
    user: {
        name: 'Sasha Mitchell',
    },
    error: null,
};

function changeStateOnChangeRoom(state, action) {
    const rooms = [...state.rooms];
    const index = _.findIndex(rooms, { id: action.room.id });
    rooms.splice(index, 1, action.room);
    return {
        ...state,
        rooms,
    };
}
function changeStateOnDeleteRoom(state, action) {
    const rooms = [...state.rooms].filter(room => room.id !== action.room.id);
    return {
        ...state,
        rooms,
    };
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CREATE_ROOM_SUCCESS:
            return {
                ...state,
                rooms: [...state.rooms, action.room],
            };

        case actionTypes.CREATE_ROOM_ERROR:
            return {
                ...state,
                error: action.error,
            };

        case actionTypes.FETCH_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.rooms,
            };

        case actionTypes.FETCH_ROOMS_ERROR:
            return {
                ...state,
                error: action.error,
            };

        case actionTypes.NEW_ROOM_CREATED:
            return {
                ...state,
                rooms: [...state.rooms, action.room]
            };

        case actionTypes.ROOM_CHANGED:
            return changeStateOnChangeRoom(state, action);

        case actionTypes.ROOM_DELETED:
            return changeStateOnDeleteRoom(state, action);


        /*
        case actionTypes.SELECT_USER:
            return {
                ...state,
                user: action.user
            };

        case actionTypes.SHOW_NOTIFICATION:
            return {
                ...state,
                error: action.error
            };

        case actionTypes.HIDE_NOTIFICATION:
            return {
                ...state,
                error: ''
            };
        */

        default:
            return state;
    }
}

export default reducer;
