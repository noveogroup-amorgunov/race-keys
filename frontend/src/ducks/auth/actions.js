import types from './types';
import service from './service';
import { LOCAL_STORAGE_KEY } from '@/constants';

const actions = {
    /**
     * @return {Object}
     */
    loginRequest() {
        return {
            type: types.LOGIN_REQUEST
        };
    },
    /**
     * @return {Object}
     */
    loginSuccess(user) {
        return {
            type: types.REGISTER_SUCCESS,
            user: {
                id: user.id,
                login: user.login
            }
        };
    },
    /**
     * @param {string} errorCode
     * @return {Object}
     */
    loginError(errorCode) {
        return {
            type: types.LOGIN_ERROR,
            errorCode
        };
    },
    /**
     * @param {UserCredentials} credentials
     * @return {Object}
     */
    login(credentials) {
        return (dispatch) => {
            dispatch(actions.loginRequest());
            return service.requestLogin(credentials)
                .then(
                    (response) => {
                        window.localStorage.setItem(LOCAL_STORAGE_KEY, response.token);
                        dispatch(actions.socketReconnect(response.token));
                        return dispatch(actions.loginSuccess(response.user));
                    },
                    (error) => {
                        return dispatch(actions.loginError(error.code));
                    }
                );
        };
    },
    /**
     * @return {Object}
     */
    registerRequest() {
        return {
            type: types.REGISTER_REQUEST
        };
    },
    registerSuccess(user) {
        return {
            type: types.REGISTER_SUCCESS,
            user: {
                id: user.id,
                login: user.login
            }
        };
    },
    /**
     * @param {string} errorCode
     * @return {Object}
     */
    registerError(errorCode) {
        return {
            type: types.REGISTER_ERROR,
            errorCode
        };
    },
    /**
     * @param {UserCredentials} credentials
     * @return {Object}
     */
    register(credentials) {
        return (dispatch) => {
            dispatch(actions.registerRequest());
            return service.requestRegister(credentials)
                .then(
                    (response) => {
                        window.localStorage.setItem(LOCAL_STORAGE_KEY, response.token);
                        dispatch(actions.socketReconnect(response.token));
                        return dispatch(actions.registerSuccess(response.user));
                    },
                    error => dispatch(actions.registerError(error.code))
                );
        };
    },
    logout() {
        return {
            type: types.LOGOUT
        };
    },
    logoutUser() {
        return (dispatch) => {
            window.localStorage.removeItem(LOCAL_STORAGE_KEY);
            dispatch(actions.socketReconnect());
            return new Promise((resolve) => {
                resolve(dispatch(actions.logout()));
            });
        };
    },
    setSocketId(socketId) {
        return {
            type: types.SET_SOCKET_ID,
            socketId,
        };
    },
    socketReconnect(token) {
        return dispatch => service.socketReconnect(token)
            .then(() => dispatch(actions.setSocketId()));
    },
    socketReconnectSuccess() {
        return {
            type: types.SOCKET_RECONNECT_SUCESS
        };
    }
};

export default actions;
