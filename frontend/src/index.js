import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import store, { history } from './store';

render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <AppContainer />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
