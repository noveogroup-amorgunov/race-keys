import { connect } from 'react-redux';
import React from 'react';

import SignUpComponent from '@/components/SignUpComponent';
import { actions, selectors } from '@/ducks/auth';


function mapStateToProps(state) {
    return {
        errorCode: selectors.selectErrorCode(state),
        isAuthenticated: selectors.selectAuthState(state)
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        register: (credentials, car) => {
            return dispatch(actions.register(credentials, car)).then(
                action => !action.errorCode && ownProps.history.push('/')
            );
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
