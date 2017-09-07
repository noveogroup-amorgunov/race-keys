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
    ModalContainer,
} from '../containers';

function AppComponent(props) {
    return (
        <div>
            <NavBarComponent
                isAuthenticated={props.isAuthenticated}
                user={props.user}
                onLogout={props.onLogout} />
            <main>
                <Route exact path='/' render={p => <RacesContainer isAuthenticated={props.isAuthenticated} {...p}/>}/>
                <Route exact path='/login' component={LoginContainer}/>
                <Route exact path='/signup' component={SignUpContainer}/>
                <Switch>
                    <Route path='/race/new' component={CreateRaceContainer}/>
                    <Route path='/race/:id' component={RaceContainer}/>
                </Switch>
            </main>
            <footer></footer>
            <ModalContainer />
        </div>
    );
}

AppComponent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default AppComponent;
