import { combineReducers } from 'redux';
import gameReducer from './game/reducer';
import mainReducer from './main/reducer';

export default combineReducers({
    game: gameReducer,
    main: mainReducer,
});
