import { History } from "history";
// import { throttle } from 'lodash';
import { routerMiddleware, connectRouter } from "connected-react-router";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore as _createStore,
  Store,
  StoreEnhancer
} from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import { defaultState, IState } from "./reducers/states";
import mainSaga from "./sagas";
import { history as appHistory } from "./utils/history";

declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => StoreEnhancer<IState>;

function createStore(history: History): Store<IState> {
  let composeEnhancers: any = compose;
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerMiddleware(history)];

  if (typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function") {
    composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });
  const enchancers = composeEnhancers(applyMiddleware(...middleware));
  let initialStore: IState = {
    ...defaultState
  };
  const createdStore = _createStore(rootReducer, initialStore, enchancers);

  sagaMiddleware.run(mainSaga);
  return createdStore;
}

export const store = createStore(appHistory) as Store<IState>;
