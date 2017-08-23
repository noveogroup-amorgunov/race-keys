import types from './types';
import service from './service';
import { LOCAL_STORAGE_KEY, RACES_PER_PAGE } from '../../constants';

const actions = {
    fetchRaceListRequest() {
        return {
            type: types.FETCH_RACE_LIST_REQUEST
        };
    },
    fetchRaceListSuccess({ races, pagination }) {
        return {
            type: types.FETCH_RACE_LIST_SUCCESS,
            races,
            pagination
        };
    },
    fetchRaceListError(errorCode) {
        return {
            type: types.FETCH_RACE_LIST_ERROR,
            errorCode
        };
    },
    fetchRaces(pageNumber = 1) {
        console.log('actions::fetchRaces');
        return (dispatch) => {
            dispatch(actions.fetchRaceListRequest());
            return service.fetchRaces(RACES_PER_PAGE, (pageNumber - 1) * RACES_PER_PAGE)
                .then(
                    response => dispatch(actions.fetchRaceListSuccess(response)),
                    error => dispatch(actions.fetchRaceListError(error.code))
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
};

export default actions;
