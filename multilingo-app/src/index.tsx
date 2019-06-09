import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import * as serviceWorker from './utils/serviceWorker';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import LoginBar, { defaultLoginBarProps } from './components/LoginBar';
import { store } from './createStore';
import { history } from './utils/history';

ReactDOM.render(
<Provider store={store}>
    <ConnectedRouter history={history}>
        <LoginBar {...defaultLoginBarProps}/>

    </ConnectedRouter>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
