import actions from './actions';
import types from './types';

export const initialState = {
    screenWidth: typeof window === 'object' ? window.innerWidth : null,
    modal: null,
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case types.SCREEN_RESIZE:
            return {
                ...state,
                screenWidth: action.screenWidth
            };
        case types.OPEN_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    modalType: action.modalType,
                    modalProps: action.modalProps,
                },
            };
        case types.HIDE_MODAL:
            return {
                ...state,
                modal: null
            };
        default:
            return state;
    }
}
