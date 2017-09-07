import uniqBy from 'lodash.uniqby';
import types from './types';

function changeStateOnChangeRace(state, action) {
    const items = [...state.items];
    const index = items.map(item => item.id).indexOf(action.race.id);
    items.splice(index, 1, action.race);
    return {
        ...state,
        items,
    };
}

function changeStateOnDeleteRace(state, action) {
    const items = [...state.items]
        .filter(race => race.id !== action.race.id);
    return {
        ...state,
        items,
    };
}

function changePlayerStateOnGameActions(state, action) {
    return {
        ...state,
        currentRaceState: {
            ...state.currentRaceState,
            me: {
                ...state.currentRaceState.me,
                ...action.player
            },
        }
    };
}

function changePlayersState(state, action) {
    // console.log(action);
    return {
        ...state,
        currentRaceState: {
            ...state.currentRaceState,
            others: action.data.players
                .filter(player => player.id !== state.currentRaceState.me.id),
        }
    };
}

export const initialState = {
    items: [],
    currentRace: null,
    currentRaceState: {
        me: null,
        others: [],
        game: {
            players: [],
        }
    },
    errorCode: null,
};

export default function races(state = initialState, action) {
    switch (action.type) {
        case types.PLAYERS_CHANGE_STATE:
            return changePlayersState(state, action);
        case types.CHANGE_POSITION_SUCCESS:
            return changePlayerStateOnGameActions(state, action);
        case types.FINISH_SUCCESS:
            return changePlayerStateOnGameActions(state, action);
        case types.ADD_ERROR_SUCCESS:
            return changePlayerStateOnGameActions(state, action);
        case types.START_GAME:
            return {
                ...state,
                currentRaceState: {
                    ...state.currentRaceState,
                    game: action.game,
                }
            };
        case types.GAME_OVER:
            return {
                ...state,
            };
        case types.USER_CHANGE_READY_STATUS:
            return {
                ...state,
                currentRaceState: {
                    ...state.currentRaceState,
                    others: state.currentRaceState.others.map(player => ({
                        ...player,
                        readyToPlay: action.player.id === player.id ? true : player.readyToPlay
                    })),
                }
            };
        case types.READY_TO_PLAY_SUCCESS:
            return {
                ...state,
                currentRaceState: {
                    ...state.currentRaceState,
                    me: { ...state.currentRaceState.me, readyToPlay: true },
                }
            };
        case types.LEAVE_RACE:
            return {
                ...initialState,
                items: state.items,
            };
        case types.USER_LEAVES_RACE:
            return {
                ...state,
                currentRaceState: {
                    ...state.currentRaceState,
                    others: state.currentRaceState.others.filter(player => player.id !== action.player.id),
                }
            };
        case types.USER_ENTERED_RACE:
            if (action.player.id === state.currentRaceState.me.id) {
                return state;
            }
            return {
                ...state,
                currentRaceState: {
                    ...state.currentRaceState,
                    others: uniqBy([...state.currentRaceState.others, action.player], 'id'),
                }
            };
        case types.JOIN_RACE_SUCCESS:
            return {
                ...state,
                currentRaceState: action.gameState,
            };
        case types.JOIN_RACE_ERROR:
            return {
                ...state,
                errorCode: action.error,
            };
        case types.FETCH_RACE_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.race],
                currentRace: action.race,
                errorCode: null,
            };
        case types.FETCH_RACE_ERROR:
            return {
                ...state,
                errorCode: action.errorCode,
            };
        case types.FETCH_RACE_LIST_SUCCESS:
            return {
                ...state,
                items: action.races,
                errorCode: null,
            };
        case types.CREATE_RACE_SUCCESS:
            return {
                ...state,
                currentRace: action.race,
                errorCode: null,
            };
        case types.EDIT_RACE_SUCCESS:
            return {
                ...state,
                currentRace: {
                    ...state.currentRace,
                    players: action.race.players,
                    text: action.race.text,
                    id: action.race.id,
                    status: action.race.status,
                }
            };
        case types.SET_CURRENT_RACE_BY_ID:
            return {
                ...state,
                currentRace: state.items.find(race =>
                    race.id === action.raceId
                ),
                errorCode: null,
            };
        case types.NEW_RACE_CREATED:
            return {
                ...state,
                items: [...state.items, action.race]
            };
        case types.RACE_DELETED:
            return changeStateOnDeleteRace(state, action);
        case types.RACE_CHANGED:
            return changeStateOnChangeRace(state, action);

        default:
            return state;
    }
}
