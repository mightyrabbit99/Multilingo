import { History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore as _createStore,
    Store,
    StoreEnhancer
} from 'redux';
import createSagaMiddleware from 'redux-saga';

declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => StoreEnhancer<IState>;

const createdStore = _createStore()