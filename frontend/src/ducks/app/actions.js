import { push } from 'react-router-redux';
import { Errors, LOCAL_STORAGE_KEY } from '../../constants';
import { actions as authActions } from '../auth/reducer';

const actions = {
    errorHandler(errorCode) {
        return (dispatch) => {
            if (!errorCode) {
                return;
            }
            switch (errorCode) {
                case Errors.TOKEN_REQUIRED:
                case Errors.TOKEN_INVALID:
                case Errors.TOKEN_EXPIRED:
                    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
                    dispatch(push('/'));
                    dispatch(authActions.logoutUser());
                    break;
                default:
            }
        };
    }
};

export default actions;
