import { SagaIterator } from "redux-saga";
import {
  call,
  put,
  race,
  select,
  take,
  takeEvery,
  fork
} from "redux-saga/effects";

import { push } from "connected-react-router";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";

//database
import rsf from "../backend/rsf";
import { SearchResult } from "../extension/dict";
import { CardDeck, Card, CardCollection } from "../extension/cards";

function* mainSaga() {
  yield fork(fetchDecksDataSaga);
  yield* sessionSaga();
  yield* userSaga();
  yield* dictSaga();
  yield* updateDatabaseDecksSaga();
}

//Fetch Data from Firebase
function* fetchDecksDataSaga() {
  yield take(actionTypes.RECEIVE_DECKS_DATA);
  const snapshot = yield call(rsf.getDocument, "Decks/n8Rs6Vb6SaiEZWB6o9fF");
  yield put(actions.receiveDecksData(snapshot.data().CardDecks));
}

//Add Decks to Firebase
function* updateDatabaseDecksSaga() {
  yield takeEvery(actionTypes.UPDATE_DATABASE_DECKS, function*(action) {
    const newDeck = (action as actionTypes.IAction).payload.decks;
    console.log("hi to updateDAtabase");
    yield call(
      rsf.updateDocument,
      "Decks/n8Rs6Vb6SaiEZWB6o9fF",
      "carddeck",
      newDeck
    );
  });
}

function* dictSaga(): SagaIterator {
  yield takeEvery(actionTypes.START_SEARCH_WORD, function*(action) {
    const word = (action as actionTypes.IAction).payload.word;
    const searchRes: SearchResult = (action as actionTypes.IAction).payload.dict.search(
      word
    );
    console.log(searchRes);
    yield put(actions.wordSearched(searchRes));
  });
}

function* sessionSaga(): SagaIterator {
  yield takeEvery(actionTypes.BACK_TO_MAIN, function*(action) {
    // clear selected deck
    yield put(actions.selectDeck());

    // redirect to main
    yield put(push("/main"));
  });

  yield takeEvery(actionTypes.TO_TEST, function*(action) {
    // redirect to main
    yield put(push("/test"));
  });

  yield takeEvery(actionTypes.SELECT_DECK, function*(action) {
    // redirect to cardlist
    yield put(push("/cardlist"));
  });
}

function* userSaga(): SagaIterator {
  yield takeEvery(actionTypes.GO_TO_LOGIN, function*(action) {
    yield put(push("/login"));
  });
}

export default mainSaga;
