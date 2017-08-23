import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GamePageContainer from '../containers/game-page-container';
import MainPageContainer from '../containers/main-page-container';
import HeaderContainer from '../components/header-component';


class AppComponent extends React.Component {
    render() {
        console.log('AppContainer -> AppComponent');
        return (
            <div>
                {/* <Switch>
                    <Route exact path="/" render={(props) => (<NavBarComponent mySize={"big"} user={this.props.user}/>)}/>
                    <Route path="/" render={(props) => (<NavBarComponent mySize={"small"} user={this.props.user}/>)}/>
                </Switch>
                */}

                <HeaderContainer />

                <Route
                    exact
                    path="/race/:id"
                    render={props => (<GamePageContainer {...props} />)} />

                <Route
                    exact
                    path="/"
                    component={MainPageContainer} />
            </div>
        );
    }
}

export default AppComponent;
