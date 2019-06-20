import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import * as serviceWorker from "./utils/serviceWorker";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { store } from "./createStore";
import { history } from "./utils/history";
import AppContainer from "./containers/AppContainer";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppContainer/>
        </ConnectedRouter>
    </Provider>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
