import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSocketIoMiddleware from 'redux-socket.io';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import io from 'socket.io-client';

import { actions as authActions } from '@/ducks/auth';
import { SOCKET_URL, LOCAL_STORAGE_KEY } from '@/constants';
import reducers from '@/ducks/reducer';

export const history = createHistory();

const socket = io(SOCKET_URL, { query: `token=${window.localStorage.getItem(LOCAL_STORAGE_KEY) || ''}` });

const historyMiddleware = routerMiddleware(history);
const loggerMiddleware = createLogger();
const socketIoMiddleware = createSocketIoMiddleware(socket, '/');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer,
    }),
    composeEnhancers(
        applyMiddleware(
            historyMiddleware,
            thunkMiddleware,
            socketIoMiddleware,
            loggerMiddleware
        )
    )
);

socket.on('connect', () =>
    store.dispatch(authActions.setSocketId(socket.id))
);

export default store;
