import { socketPrefix } from '../../constants';

const toServer = actionType => socketPrefix + actionType;

const types = {

    /**
     * Actions, which user send to server
     */

    PUT_CARD_REQUEST: toServer('@@game/PUT_CARD_REQUEST'),
    SHUFFLE_CARDS_REQUEST: toServer('@@game/SHUFFLE_CARDS_REQUEST'),
    GET_ONE_CARD_REQUEST: toServer('@@game/GET_ONE_CARD_REQUEST'),
    PUT_CARD_FROM_PACK_REQUEST: toServer('@@game/PUT_CARD_FROM_PACK_REQUEST'),
    GET_THREE_CARDS_REQUEST: toServer('@@game/GET_THREE_CARDS_REQUEST'),
    DISPLAY_RIVAL_CARD_REQUEST: toServer('@@game/DISPLAY_RIVAL_CARD_REQUEST'),

    /**
     * Actions, which server send to client side
     */

    NEW_CARD_ON_BOARD: '@@game/NEW_CARD_ON_BOARD',

    DISCARD_PACK: '@@game/DISCARD_PACK',

    PUT_CARD_SUCCESS: '@@game/PUT_CARD_SUCCESS',
    PUT_CARD_ERROR: '@@game/PUT_CARD_ERROR',

    GET_THREE_CARDS_SUCCESS: '@@game/GET_THREE_CARDS_SUCCESS',
    GET_THREE_CARDS_ERROR: '@@game/GET_THREE_CARDS_ERROR',

    PUT_CARD_FROM_PACK_SUCCESS: '@@game/PUT_CARD_FROM_PACK_SUCCESS',
    PUT_CARD_FROM_PACK_ERROR: '@@game/PUT_CARD_FROM_PACK_ERROR',

    SHUFFLE_CARDS_SUCCESS: '@@game/SHUFFLE_CARDS_SUCCESS',
    SHUFFLE_CARDS_ERROR: '@@game/SHUFFLE_CARDS_ERROR',

    GET_ONE_CARD_SUCCESS: '@@game/GET_ONE_CARD_SUCCESS',
    GET_ONE_CARD_ERROR: '@@game/GET_ONE_CARD_ERROR',

    PLAYER_GOT_CARD_IN_ROW: '@@game/PLAYER_GOT_CARD_IN_ROW',
    PLAYER_GOT_CARDS_IN_REMAINING_STACK: '@@game/PLAYER_GOT_CARDS_IN_REMAINING_STACK',

    // ---------- Internal --------
    HIDE_GAME_OVER_MODAL: '@@game/HIDE_GAME_OVER_MODAL',
};

export default types;
