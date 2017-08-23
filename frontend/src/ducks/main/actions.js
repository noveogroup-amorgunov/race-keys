import types from './types';
import mainService from './service';

const actions = {
    fetchRoomsRequest: () => ({ type: types.FETCH_ROOMS_REQUEST }),
    fetchRoomsSuccess: rooms => ({ type: types.FETCH_ROOMS_SUCCESS, rooms }),
    fetchRoomsError: error => ({ type: types.FETCH_ROOMS_ERROR, error }),
    fetchRooms: () => (dispatch) => {
        dispatch(actions.fetchRoomsRequest());
        return mainService
            .fetchRooms()
            .then(
                result => dispatch(actions.fetchRoomsSuccess(result)),
                error => dispatch(actions.fetchRoomsError(error.message))
            );
    },

    createRoomRequest: () => ({ type: types.CREATE_ROOM_REQUEST }),
    createRoomSuccess: room => ({ type: types.CREATE_ROOM_SUCCESS, room }),
    createRoomError: error => ({ type: types.CREATE_ROOM_ERROR, error }),
    createRoom: () => (dispatch) => {
        dispatch(actions.createRoomRequest());
        return mainService
            .createRoom(name)
            .then(
                result => dispatch(actions.createRoomSuccess(result)),
                error => dispatch(actions.createRoomError(error.message))
            );
    },

    /*
    selectUser: user => ({ type: types.SELECT_USER, user }),
    showNotification: error => ({ type: types.SHOW_NOTIFICATION, error }),
    hideNotification: () => ({ type: types.HIDE_NOTIFICATION }),
    */
};

export default actions;
