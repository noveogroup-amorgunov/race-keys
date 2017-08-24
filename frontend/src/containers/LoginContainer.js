import React from 'react';
import { connect } from 'react-redux';
import LoginComponent from '@/components/LoginComponent';
import { actions, selectors } from '@/ducks/auth';


function mapStateToProps(state) {
    return {
        errorCode: selectors.selectErrorCode(state),
        isAuthenticated: selectors.selectAuthState(state)
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        login: (credentials) => {
            return dispatch(actions.login(credentials)).then(
                action => !action.errorCode && ownProps.history.push('/')
            );
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
