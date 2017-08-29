import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import NavBarComponent from './NavBarComponent';

import {
    LoginContainer,
    SignUpContainer,
    RacesContainer,
    CreateRaceContainer,
    RaceContainer,
} from '../containers';

function AppComponent(props) {
    return (
        <div>
            <NavBarComponent
                isAuthenticated={props.isAuthenticated}
                user={props.user}
                onLogout={props.onLogout} />
            <main>
                <Route exact path='/' component={RacesContainer}/>
                <Route exact path='/login' component={LoginContainer}/>
                <Route exact path='/signup' component={SignUpContainer}/>
                <Route exact path='/race/:id' component={RaceContainer}/>
                <Switch>
                    <Route path='/race/new' component={CreateRaceContainer}/>
                </Switch>
            </main>
            <footer></footer>
        </div>
    );
}

AppComponent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default AppComponent;
