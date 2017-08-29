import _ from 'lodash';
import types from './types';

function changeStateOnChangeRace(state, action) {
    const items = [...state.items];
    const index = _.findIndex(items, { id: action.race.id });
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

export const initialState = {
    items: [],
    currentRace: null,
    pagination: {}
};

export default function races(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_RACE_LIST_SUCCESS:
            return {
                ...state,
                items: action.races,
                pagination: action.pagination
            };
        case types.CREATE_RACE_SUCCESS:
            return {
                ...state,
                currentRace: action.race
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
                )
            };
        case types.NEW_RACE_CREATED:
            return {
                ...state,
                items: [...state.items, action.race]
            };
        case types.RACE_DELETED:
            return changeStateOnChangeRace(state, action);
        case types.RACE_CHANGED:
            return changeStateOnDeleteRace(state, action);

        default:
            return state;
    }
}
