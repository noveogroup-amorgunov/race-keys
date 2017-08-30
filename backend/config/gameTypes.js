const socketPrefix = 'server/';

const toServerAction = action => socketPrefix + action;

const game = action => `@@game/${action}`;
const main = action => `@@races/${action}`;

module.exports = {
    socketPrefix,
    gameTypes: {
        READY_TO_PLAY: toServerAction(game('READY_TO_PLAY')),
        READY_TO_PLAY_ERROR: game('READY_TO_PLAY_ERROR'),
        READY_TO_PLAY_SUCCESS: game('READY_TO_PLAY_SUCCESS'),

        LEAVE_RACE: toServerAction(game('LEAVE_RACE')),

        JOIN_RACE_REQUEST: toServerAction(game('JOIN_RACE_REQUEST')),
        JOIN_RACE_SUCCESS: game('JOIN_RACE_SUCCESS'),
        JOIN_RACE_ERROR: game('JOIN_RACE_ERROR'),

        START_GAME: game('START_GAME'),
        GAME_OVER: game('GAME_OVER'),

        USER_CHANGE_READY_STATUS: game('USER_CHANGE_READY_STATUS'),
        PLAYERS_CHANGE_STATE: game('PLAYERS_CHANGE_STATE'),

        CHANGE_POSITION_REQUEST: toServerAction(game('CHANGE_POSITION_REQUEST')),
        CHANGE_POSITION_SUCCESS: game('CHANGE_POSITION_SUCCESS'),
        CHANGE_POSITION_ERROR: game('CHANGE_POSITION_ERROR'),

        FINISH_REQUEST: toServerAction(game('FINISH_REQUEST')),
        FINISH_SUCCESS: game('FINISH_SUCCESS'),
        FINISH_ERROR: game('FINISH_ERROR'),

        ADD_ERROR_REQUEST: toServerAction(game('ADD_ERROR_REQUEST')),
        ADD_ERROR_SUCCESS: game('ADD_ERROR_SUCCESS'),
        ADD_ERROR_ERROR: game('ADD_ERROR_ERROR'),
    },
    mainTypes: {
        USER_LEAVES_RACE: main('USER_LEAVES_RACE'),
        USER_ENTERED_RACE: main('USER_ENTERED_RACE'),

        NEW_RACE_CREATED: main('NEW_RACE_CREATED'),
        RACE_DELETED: main('RACE_DELETED'),
        RACE_CHANGED: main('RACE_CHANGED'),
    },
    gameErrors: {
        RACE_NOT_FOUND: 'RACE_NOT_FOUND',
        PLAYER_NOT_FOUND: 'PLAYER_NOT_FOUND',
        GAME_ALREADY_STARTED: 'GAME_ALREADY_STARTED',
        GAME_NOT_STARTED: 'GAME_NOT_STARTED',
        RACE_FULL: 'RACE_FULL',
    },
};
