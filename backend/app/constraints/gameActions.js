const socketPrefix = 'server/';

const toServerAction = action => socketPrefix + action;

const game = action => `@@game/${action}`;
const main = action => `@@main/${action}`;

module.exports = {
    socketPrefix,
    gameTypes: {
        READY_TO_PLAY: toServerAction(game('READY_TO_PLAY')),
        READY_TO_PLAY_ERROR: game('READY_TO_PLAY_ERROR'),

        START_GAME: game('START_GAME'),
        GAME_OVER: game('GAME_OVER'),

        CHANGE_POSITION_REQUEST: toServerAction(game('CHANGE_POSITION_REQUEST')),
        CHANGE_POSITION_SUCCESS: game('CHANGE_POSITION_SUCCESS'),
        CHANGE_POSITION_ERROR: game('CHANGE_POSITION_ERROR'),

        FINISH_REQUEST: toServerAction(game('FINISH_REQUEST')),
        FINISH_SUCCESS: game('FINISH_SUCCESS'),
        FINISH_ERROR: game('FINISH_ERROR'),

        ADD_ERROR_REQUEST: toServerAction(game('ADD_ERROR_REQUEST')),
        ADD_ERROR_SUCCESS: game('ADD_ERROR_SUCCESS'),
        ADD_ERROR_ERROR: game('ADD_ERROR_ERROR'),

        /* NEW_CARD_ON_BOARD: '@@game/NEW_CARD_ON_BOARD',
        PUT_CARD_REQUEST: socketPrefix + '@@game/PUT_CARD_REQUEST',
        PUT_CARD_SUCCESS: '@@game/PUT_CARD_SUCCESS',
        PUT_CARD_ERROR: '@@game/PUT_CARD_ERROR',

        PUT_CARD_FROM_PACK_REQUEST: socketPrefix + '@@game/PUT_CARD_FROM_PACK_REQUEST',
        PUT_CARD_FROM_PACK_SUCCESS: '@@game/PUT_CARD_FROM_PACK_SUCCESS',
        PUT_CARD_FROM_PACK_ERROR: '@@game/PUT_CARD_FROM_PACK_ERROR',

        SHUFFLE_CARDS_REQUEST: socketPrefix + '@@game/SHUFFLE_CARDS_REQUEST',
        SHUFFLE_CARDS_SUCCESS: '@@game/SHUFFLE_CARDS_SUCCESS',
        SHUFFLE_CARDS_ERROR: '@@game/SHUFFLE_CARDS_ERROR',

        DISCARD_PACK: '@@game/DISCARD_PACK',

        GET_ONE_CARD_REQUEST: socketPrefix + '@@game/GET_ONE_CARD_REQUEST',
        GET_ONE_CARD_SUCCESS: '@@game/GET_ONE_CARD_SUCCESS',
        GET_ONE_CARD_ERROR: '@@game/GET_ONE_CARD_ERROR',

        GET_THREE_CARDS_REQUEST: socketPrefix + '@@game/GET_THREE_CARDS_REQUEST',
        GET_THREE_CARDS_SUCCESS: '@@game/GET_THREE_CARDS_SUCCESS',
        GET_THREE_CARDS_ERROR: '@@game/GET_THREE_CARDS_ERROR',

        PLAYER_GOT_CARD_IN_ROW: '@@game/PLAYER_GOT_CARD_IN_ROW',
        PLAYER_GOT_CARDS_IN_REMAINING_STACK: '@@game/PLAYER_GOT_CARDS_IN_REMAINING_STACK',
        */
    },
    mainTypes: {
        USER_LEAVES_RACE: main('USER_LEAVES_RACE'),
        USER_ENTERED_RACE: main('USER_ENTERED_RACE'),

        LEAVE_RACE: toServerAction(main('LEAVE_RACE')),

        JOIN_RACE_REQUEST: toServerAction(main('JOIN_RACE_REQUEST')),
        JOIN_RACE_SUCCESS: main('JOIN_RACE_SUCCESS'),
        JOIN_RACE_ERROR: main('JOIN_RACE_ERROR'),

        NEW_RACE_CREATED: main('NEW_RACE_CREATED'),
        RACE_DELETED: main('RACE_DELETED'),
        RACE_CHANGED: main('RACE_CHANGED'),
    },
    gameErrors: {
        /* NO_FREE_POSITIONS: 'ERR_NO_FREE_POSITION',
        REMAINING_STACK_EMPTY: 'ERR_REMAINING_STACK_EMPTY',
        UNABLE_TO_PLACE_CARD: 'ERR_UNABLE_TO_PLACE_CARD',
        REMAINING_PACK_NOT_EMPTY: 'ERR_REMAINING_PACK_NOT_EMPTY',
        REMAINING_PACK_EMPTY: 'ERR_REMAINING_PACK_EMPTY',
        STACK_EMPTY: 'ERR_STACK_EMPTY',
        PUT_INVALID_POSITION: 'ERR_PUT_INVALID_POSITION',
        */

        RACE_NOT_FOUND: 'RACE_NOT_FOUND',
        PLAYER_NOT_FOUND: 'PLAYER_NOT_FOUND',

        GAME_ALREADY_STARTED: 'GAME_ALREADY_STARTED',
        GAME_NOT_STARTED: 'GAME_NOT_STARTED',
        RACE_FULL: 'RACE_FULL',
    },
};
