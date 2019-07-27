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
import {
  CardDeck,
  Card,
  CardCollection,
  exampleExplCard1,
  cardToJSON
} from "../extension/cards";

function* mainSaga() {
<<<<<<< HEAD
  //yield fork(fetchDecksDataSaga);
  yield* sessionSaga();
  yield* userSaga();
  yield* dictSaga();
=======
  yield fork(fetchDecksDataSaga);
  yield* sessionSaga();
  yield* userSaga();
  yield* dictSaga();
  //yield* updateDatabaseDecksSaga();
>>>>>>> 2dba3341c911b939f1f542a341421f7822bc7593
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
    const newCardDecks = (action as actionTypes.IAction).payload.decks;
    yield call(
      rsf.updateDocument,
      "Decks/n8Rs6Vb6SaiEZWB6o9fF",
      "CardDecks",
      newCardDecks
    );
    /*
    console.log(Object.values(exampleExplCard1));
    yield call(rsf.updateDocument, "Decks/n8Rs6Vb6SaiEZWB6o9fF", "cards", [
      cardToJSON(exampleExplCard1)
    ]);
    */
  });
}

function* dictSaga(): SagaIterator {
  yield takeEvery(actionTypes.START_SEARCH_WORD, function*(action) {
    const word = (action as actionTypes.IAction).payload.word;
<<<<<<< HEAD
		const res = yield call((action as actionTypes.IAction).payload.dict.search, word);
		console.log(res);
		yield put(actions.wordSearched(res));
=======
    const searchRes: SearchResult = (action as actionTypes.IAction).payload.dict.search(
      word
    );
    console.log(searchRes);
    yield put(actions.wordSearched(searchRes));
>>>>>>> 2dba3341c911b939f1f542a341421f7822bc7593
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
