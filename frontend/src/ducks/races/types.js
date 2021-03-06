import { socketPrefix } from '@/constants';

const toServer = actionType => socketPrefix + actionType;

const types = {
    FETCH_RACE_LIST_REQUEST: '@@races/FETCH_RACE_LIST_REQUEST',
    FETCH_RACE_LIST_SUCCESS: '@@races/FETCH_RACE_LIST_SUCCESS',
    FETCH_RACE_LIST_ERROR: '@@races/FETCH_RACE_LIST_ERROR',

    FETCH_RACE_REQUEST: '@@races/FETCH_RACE_REQUEST',
    FETCH_RACE_SUCCESS: '@@races/FETCH_RACE_SUCCESS',
    FETCH_RACE_ERROR: '@@races/FETCH_RACE_ERROR',

    CREATE_RACE_REQUEST: '@@races/CREATE_RACE_REQUEST',
    CREATE_RACE_SUCCESS: '@@races/CREATE_RACE_SUCCESS',
    CREATE_RACE_ERROR: '@@races/CREATE_RACE_ERROR',

    SET_CURRENT_RACE_BY_ID: '@@races/SET_CURRENT_RACE_BY_ID',
    SET_CURRENT_RACE_AS_OBJECT: '@@races/SET_CURRENT_RACE_AS_OBJECT',

    NEW_RACE_CREATED: '@@races/NEW_RACE_CREATED',
    RACE_DELETED: '@@races/RACE_DELETED',
    RACE_CHANGED: '@@races/RACE_CHANGED',

    USER_LEAVES_RACE: '@@races/USER_LEAVES_RACE',
    USER_ENTERED_RACE: '@@races/USER_ENTERED_RACE',

    /**
     * Actions, which user send to server
     */

    READY_TO_PLAY: toServer('@@game/READY_TO_PLAY'),
    LEAVE_RACE: toServer('@@game/LEAVE_RACE'),
    JOIN_RACE_REQUEST: toServer('@@game/JOIN_RACE_REQUEST'),

    ADD_ERROR_REQUEST: toServer('@@game/ADD_ERROR_REQUEST'),
    CHANGE_POSITION_REQUEST: toServer('@@game/CHANGE_POSITION_REQUEST'),
    FINISH_REQUEST: toServer('@@game/FINISH_REQUEST'),

    /**
     * Actions, which server send to client side
     */

    JOIN_RACE_SUCCESS: '@@game/JOIN_RACE_SUCCESS',
    JOIN_RACE_ERROR: '@@game/JOIN_RACE_ERROR',

    READY_TO_PLAY_ERROR: '@@game/READY_TO_PLAY_ERROR',
    READY_TO_PLAY_SUCCESS: '@@game/READY_TO_PLAY_SUCCESS',
    USER_READY_TO_PLAY: '@@game/USER_READY_TO_PLAY',

    USER_CHANGE_READY_STATUS: '@@game/USER_CHANGE_READY_STATUS',
    PLAYERS_CHANGE_STATE: '@@game/PLAYERS_CHANGE_STATE',

    START_GAME: '@@game/START_GAME',
    GAME_OVER: '@@game/GAME_OVER',

    CHANGE_POSITION_SUCCESS: '@@game/CHANGE_POSITION_SUCCESS',
    CHANGE_POSITION_ERROR: '@@game/CHANGE_POSITION_ERROR',
    FINISH_SUCCESS: '@@game/FINISH_SUCCESS',
    FINISH_ERROR: '@@game/FINISH_ERROR',
    ADD_ERROR_SUCCESS: '@@game/ADD_ERROR_SUCCESS',
    ADD_ERROR_ERROR: '@@game/ADD_ERROR_ERROR',

};

export default types;
