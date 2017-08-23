import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './containers/app-container';
import store, { history } from './store';

/*
<BrowserRouter>
    <AppContainer />
</BrowserRouter>
<ConnectedRouter history={history}>
*/

render(
    <Provider store={store}>
        <BrowserRouter>
            <AppContainer />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
