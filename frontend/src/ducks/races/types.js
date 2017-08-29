import { socketPrefix } from '../../constants';

const toServer = actionType => socketPrefix + actionType;

const types = {
    FETCH_RACE_LIST_REQUEST: '@@races/FETCH_RACE_LIST_REQUEST',
    FETCH_RACE_LIST_SUCCESS: '@@races/FETCH_RACE_LIST_SUCCESS',
    FETCH_RACE_LIST_ERROR: '@@races/FETCH_RACE_LIST_ERROR',

    CREATE_RACE_REQUEST: '@@races/CREATE_RACE_REQUEST',
    CREATE_RACE_SUCCESS: '@@races/CREATE_RACE_SUCCESS',
    CREATE_RACE_ERROR: '@@races/CREATE_RACE_ERROR',

    SET_CURRENT_RACE_BY_ID: '@@races/SET_CURRENT_RACE_BY_ID',
    SET_CURRENT_RACE_AS_OBJECT: '@@races/SET_CURRENT_RACE_AS_OBJECT',

    NEW_RACE_CREATED: '@@races/NEW_RACE_CREATED',
    RACE_DELETED: '@@races/RACE_DELETED',
    RACE_CHANGED: '@@races/RACE_CHANGED',

    /**
     * Actions, which user send to server
     */

    READY_TO_PLAY: toServer('@@game/READY_TO_PLAY'),
    LEAVE_RACE: toServer('@@races/LEAVE_RACE'),
    JOIN_RACE_REQUEST: toServer('@@races/JOIN_RACE_REQUEST'),
};

export default types;
