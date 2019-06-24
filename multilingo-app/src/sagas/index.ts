import { SagaIterator } from "redux-saga";
import { call, put, race, select, take, takeEvery, fork } from "redux-saga/effects";

import { push } from "connected-react-router";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";

import { CardDeck } from "../extension/cards";

//database
import rsf from "../backend/rsf";

function* mainSaga() {
  yield fork(fetchDecksDataSaga);
  yield* sessionSaga();
}

function* fetchDecksDataSaga() {
  yield take(actionTypes.RECEIVE_DECKS_DATA);
  const snapshot = yield call(rsf.getCollection, "Decks");
  yield put(actions.receiveDecksData(snapshot.docs[0].data().CardDecks));
}

function* sessionSaga(): SagaIterator {
  yield takeEvery(actionTypes.BACK_TO_MAIN, function*(action) {
    // clear selected deck
    yield put(actions.selectDeck());

    // redirect to main
    yield put(push("/main"));
  });

  yield takeEvery(actionTypes.SELECT_DECK, function*(action) {
    // redirect to cardlist
    yield put(push("/cardlist"));
  });
}

export default mainSaga;
