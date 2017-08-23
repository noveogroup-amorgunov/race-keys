import types from './types';
import service from './service';
import { LOCAL_STORAGE_KEY } from '../../constants';

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
     * @typedef {Object} UserCredentials
     * @property {string} login
     * @property {string} password
     */
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
                        console.log(response);
                        window.localStorage.setItem(LOCAL_STORAGE_KEY, response.token);
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
            return new Promise((resolve) => {
                resolve(dispatch(actions.logout()));
            });
        };
    }
};

export default actions;
