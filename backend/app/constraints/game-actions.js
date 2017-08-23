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
        USER_LEAVES_ROOM: main('USER_LEAVES_ROOM'),
        USER_ENTERED_ROOM: main('USER_ENTERED_ROOM'),

        LEAVE_ROOM: toServerAction(main('LEAVE_ROOM')),

        JOIN_ROOM_REQUEST: toServerAction(main('JOIN_ROOM_REQUEST')),
        JOIN_ROOM_SUCCESS: main('JOIN_ROOM_SUCCESS'),
        JOIN_ROOM_ERROR: main('JOIN_ROOM_ERROR'),

        NEW_ROOM_CREATED: main('NEW_ROOM_CREATED'),
        ROOM_CHANGED: main('ROOM_CHANGED'),
        ROOM_DELETED: main('ROOM_DELETED'),
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

        ROOM_DOES_NOT_EXIST: 'ERR_ROOM_DOES_NOT_EXIST',
        PLAYER_DOES_NOT_EXIST: 'ERR_PLAYER_DOES_NOT_EXIST',

        GAME_ALREADY_STARTED: 'ERR_GAME_ALREADY_STARTED',
        GAME_NOT_STARTED: 'ERR_GAME_NOT_STARTED',
        ROOM_FULL: 'ERR_ROOM_FULL',
    },
};
