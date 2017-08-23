import types from './types';
import service from './service';
import actions from './actions';
import selectors from './selectors';

const initialState = {
    items: [],
    currentRace: null,
    pagination: {}
};

export {
    service,
    types,
    actions,
    selectors,
    initialState
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
                    // title: action.race.title,
                    // image_url: action.race.image_url,
                    // content: action.race.content
                }
            };
        case types.SET_CURRENT_RACE_BY_ID:
            return {
                ...state,
                currentRace: state.items.find(race =>
                    race.id === action.raceId
                )
            };
        default:
            return state;
    }
}
