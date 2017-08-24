import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { selectors as userSelectors, actions as userActions } from '@/ducks/user';
import { selectors as authSelectors, actions as authActions } from '@/ducks/auth';
import AppComponent from '@/components/AppComponent';

class AppContainer extends React.Component {
    componentWillMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <AppComponent
                isAuthenticated={this.props.isAuthenticated}
                onLogout={this.props.logout}
                user={this.props.user}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: authSelectors.selectAuthState(state),
        user: userSelectors.selectUser(state),
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        fetchUser: bindActionCreators(userActions.fetchUser, dispatch),
        logout: () => {
            dispatch(authActions.logoutUser()).then(() => ownProps.history.push('/login'));
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
