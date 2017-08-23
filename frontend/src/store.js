import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import { initialState as gameInitialState } from './ducks/game/reducer';
import { initialState as mainInitialState } from './ducks/main/reducer';
import reducers from './ducks/reducer';
import { SOCKET_URL } from './constants';

export const history = createHistory();

const
    historyMiddleware = routerMiddleware(history),
    loggerMiddleware = createLogger(),
    socketIoMiddleware = createSocketIoMiddleware(io(SOCKET_URL), '/');


const user = JSON.parse(window.localStorage.getItem('user'));
const preloadedState = {
    main: { ...mainInitialState, user: user || mainInitialState.user },
    game: gameInitialState
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer,
    }),
    preloadedState,
    composeEnhancers(
        applyMiddleware(
            historyMiddleware,
            thunkMiddleware,
            socketIoMiddleware,
            // loggerMiddleware
        )
    )
);

export default store;
