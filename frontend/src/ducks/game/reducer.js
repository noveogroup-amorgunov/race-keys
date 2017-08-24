import { gameStatuses } from '@/constants';
import types from './types';

export const initialState = {
    my: {},
    players: [],
    playerPositions: [],
    status: gameStatuses.WAIT_PLAYERS,
    startedAt: null,
    end: null,
    error: null,
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case types.LEAVE_ROOM:
            return {
                ...initialState
            };

        case types.JOIN_ROOM_REQUEST:
            return {
                ...state,
            };

        case types.JOIN_ROOM_SUCCESS:
            return {
                ...state,
                my: action.player,
                players: [...state.players, action.player]
            };

        case types.JOIN_ROOM_ERROR:
            return {
                ...state,
                error: action.error
            };

        case types.START_GAME:
            return {
                ...state,
                status: gameStatuses.IN_PROCESS,
                startedAt: new Date(),
            };

        case types.USER_ENTERED_ROOM:
            return {
                ...state,
                players: [...state.players, action.player]
            };
        default:
            return state;
    }
}


/*

function startOrBackUp(state, action) {
    let newState = {
        ...state,
        my: action.me || {},
        status: action.status,
        socketId: action.socketId,
        cardsOnBoard: action.cardsOnBoard && [...action.cardsOnBoard],
        gameOver: undefined,
        showGameOver: false
    };
    action.others.forEach((obj, index) => {
        newState[sides[index]] = obj;
    });
    return newState;
}



function reducer(state = initialState, action){
    switch(action.type){


        case actionTypes.PLAYER_GOT_CARD_IN_ROW:
            const newState1 = {
                ...state,
            };

            for (let i = 0; i < 3; i++) {
                if (newState1[sides[i]].color === action.color) {
                    newState1[sides[i]] = {...newState1[sides[i]]};
                    newState1[sides[i]].row = action.row;
                    break;
                }
            }
            return newState1;

        case actionTypes.PLAYER_GOT_CARDS_IN_REMAINING_STACK:
            const newState2 = {
                ...state,
            };

            for (let i = 0; i < 3; i++) {
                if (newState2[sides[i]].color === action.color) {
                    newState2[sides[i]] = {...newState2[sides[i]]};
                    newState2[sides[i]].remainingStack = [action.card];
                    break;
                }
            }
            return newState2;

        case actionTypes.GAME_OVER:
            return {
                ...state,
                status: action.status,
                showGameOver: true,
                gameOver: {
                    winner: action.winner,
                    players: action.others
                }
            };

        case actionTypes.NEW_CARD_ON_BOARD:
            let cardsOnBoard = [...state.cardsOnBoard];
            cardsOnBoard[parseInt(action.position)] = action.card;
            return {
                ...state,
                cardsOnBoard
            };

        case actionTypes.DISCARD_PACK:
            cardsOnBoard = [...state.cardsOnBoard];
            _.pullAt(cardsOnBoard, [action.position]);
            return {
                ...state,
                cardsOnBoard
            };

        case actionTypes.GET_ONE_CARD_REQUEST:
            return {
                ...state,
            };

        case actionTypes.GET_ONE_CARD_SUCCESS:
            return {
                ...state,
                my: {
                    ...state.my,
                    row: action.row,
                    stackCount: state.my.stackCount - 1
                }
            };

        case actionTypes.GET_THREE_CARDS_SUCCESS:
            return{
                ...state,
                my: {
                    ...state.my,
                    remainingStack: [...state.my.remainingStack, ...action.cards],
                    remainingCardsCount: state.my.remainingCardsCount - 3
                }
            };



        case actionTypes.GET_ONE_CARD_ERROR:
            return {
                ...state,
                gameError: action.err
            };

        case actionTypes.PUT_CARD_SUCCESS:
            return {
                ...state,
                my: {
                    ...state.my,
                    row: action.row

                }
            };

        case actionTypes.PUT_CARD_FROM_PACK_SUCCESS:
            let remainingStack = [...state.my.remainingStack];
            remainingStack.pop();
            return {
                ...state,
                my: {
                    ...state.my,
                    remainingStack
                }
            };

        case actionTypes.SHUFFLE_CARDS_REQUEST:
            return {
                ...state,
            };

        case actionTypes.SHUFFLE_CARDS_SUCCESS:
            return {
                ...state,
                my: {
                    ...state.my,
                    remainingStack: [],
                    remainingCardsCount: action.remainingPackCount
                }
            };

        case actionTypes.SHUFFLE_CARDS_ERROR:
            return {
                ...state,
                gameError: action.err
            };

        case actionTypes.HIDE_GAME_OVER_MODAL:
            return {
                ...state,
                showGameOver: false,
            };

        default:
            return state;
    }
}*/
