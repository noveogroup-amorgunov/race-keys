import React from 'react';
import { connect } from 'react-redux';
import SignUpComponent from '../components/SignUpComponent';
import { actions, selectors } from '../ducks/auth/reducer';


function mapStateToProps(state) {
    return {
        errorCode: selectors.selectErrorCode(state),
        isAuthenticated: selectors.selectAuthState(state)
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        register: (credentials) => {
            return dispatch(actions.register(credentials)).then(
                (action) => !action.errorCode && ownProps.history.push('/')
            );
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
