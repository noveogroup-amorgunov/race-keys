import userReducer, { types as userTypes, initialState as userInitialState } from '@/ducks/user';
import types from './types';

export const initialState = {
    errorCode: null,
    isAuthenticated: false,
    user: userInitialState,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
        case types.REGISTER_REQUEST:
            return {
                ...state,
                errorCode: null
            };
        case types.LOGIN_SUCCESS:
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.user
                },
                isAuthenticated: true
            };
        case types.LOGIN_ERROR:
        case types.REGISTER_ERROR:
            return {
                ...state,
                errorCode: action.errorCode
            };
        case types.LOGOUT:
            return {
                ...state,
                user: { ...userInitialState },
                isAuthenticated: false
            };
        case userTypes.FETCH_USER_REQUEST:
        case userTypes.FETCH_USER_ERROR:
            return {
                ...state,
                user: userReducer(state.user, action)
            };
        case userTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: userReducer(state.user, action)
            };
        case types.SET_SOCKET_ID:
            return {
                ...state,
                user: {
                    ...state.user,
                    socketId: action.socketId,
                },
            };
        default:
            return state;
    }
}
