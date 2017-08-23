import types from './types';
import service from './service';
import { LOCAL_STORAGE_KEY, Errors } from '../../constants';

const actions = {
    fetchUserRequest() {
        return {
            type: types.FETCH_USER_REQUEST
        };
    },
    fetchUserSuccess(user) {
        return {
            type: types.FETCH_USER_SUCCESS,
            user: {
                id: user.id,
                login: user.login
            }
        };
    },
    fetchUserError(errorCode) {
        return {
            type: types.FETCH_USER_ERROR,
            errorCode
        };
    },
    fetchUser() {
        return (dispatch) => {
            const token = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            dispatch(actions.fetchUserRequest());
            if (!token) {
                return Promise.resolve(dispatch(actions.fetchUserError(Errors.TOKEN_REQUIRED)));
            }
            return service.fetchUser(token)
                .then(
                    response => dispatch(actions.fetchUserSuccess(response.user)),
                    error => dispatch(actions.fetchUserError(error.code)),
                );
        };
    }
};

export default actions;
