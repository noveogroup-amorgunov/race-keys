import types from './types';
import service from './service';
import { LOCAL_STORAGE_KEY, RACES_PER_PAGE } from '../../constants';

const actions = {
    fetchRaceListRequest() {
        return {
            type: types.FETCH_RACE_LIST_REQUEST
        };
    },
    fetchRaceListSuccess({ races }) {
        return {
            type: types.FETCH_RACE_LIST_SUCCESS,
            races,
        };
    },
    fetchRaceListError(errorCode) {
        return {
            type: types.FETCH_RACE_LIST_ERROR,
            errorCode
        };
    },
    fetchNotFinishedRaces() {
        return (dispatch) => {
            const token = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            dispatch(actions.fetchRaceListRequest());
            return service.fetchNotFinishedRaces(token)
                .then(
                    response => dispatch(actions.fetchRaceListSuccess(response)),
                    error => dispatch(actions.fetchRaceListError(error.code))
                );
        };
    },
    fetchRaces(pageNumber = 1) {
        return (dispatch) => {
            dispatch(actions.fetchRaceListRequest());
            return service.fetchRaces(RACES_PER_PAGE, (pageNumber - 1) * RACES_PER_PAGE)
                .then(
                    response => dispatch(actions.fetchRaceListSuccess(response)),
                    error => dispatch(actions.fetchRaceListError(error.code))
                );
        };
    },
    fetchRaceRequest() {
        return {
            type: types.FETCH_RACE_REQUEST
        };
    },
    fetchRaceSuccess({ race }) {
        return {
            type: types.FETCH_RACE_SUCCESS,
            race,
        };
    },
    fetchRaceError(errorCode) {
        return {
            type: types.FETCH_RACE_ERROR,
            errorCode
        };
    },
    fetchRace(id) {
        return (dispatch) => {
            dispatch(actions.fetchRaceRequest());
            return service.fetchRace(id)
                .then(
                    response => dispatch(actions.fetchRaceSuccess(response)),
                    error => dispatch(actions.fetchRaceError(error.code))
                );
        };
    },
    createRaceRequest() {
        return {
            type: types.CREATE_RACE_REQUEST
        };
    },
    createRaceSuccess(race) {
        return {
            type: types.CREATE_RACE_SUCCESS,
            race
        };
    },
    createRaceError(errorCode) {
        return {
            type: types.CREATE_RACE_ERROR,
            errorCode
        };
    },
    createRace(raceData) {
        return (dispatch) => {
            const token = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            dispatch(actions.createRaceRequest());
            return service.createRace(token, raceData)
                .then(
                    response => dispatch(actions.createRaceSuccess(response.race)),
                    error => dispatch(actions.createRaceError(error.code))
                );
        };
    },
    setCurrentRaceById(raceId) {
        return {
            type: types.SET_CURRENT_RACE_BY_ID,
            raceId
        };
    },
    joinRaceRequest(raceId, socketId) {
        return {
            type: types.JOIN_RACE_REQUEST,
            raceId,
            socketId,
        };
    },
    readyToPlay(raceId) {
        return {
            type: types.READY_TO_PLAY,
            raceId,
        };
    },
    leaveRace(raceId) {
        return {
            type: types.LEAVE_RACE,
            raceId,
        };
    },
    makeErrorInTextRequest(raceId) {
        return {
            type: types.ADD_ERROR_REQUEST,
            raceId,
        };
    },
    movingForwardRequest(raceId, position) {
        return {
            type: types.CHANGE_POSITION_REQUEST,
            raceId,
            position,
        };
    },
    finishRaceRequest(raceId) {
        return {
            type: types.FINISH_REQUEST,
            raceId,
        };
    },
};

export default actions;
