import { SagaIterator } from "redux-saga";
import { call, put, race, select, take, takeEvery, fork } from "redux-saga/effects";

import { push } from "connected-react-router";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";

//database
import rsf from "../backend/rsf";
import { SearchResult } from "../extension/dict";

function* mainSaga() {
  //yield fork(fetchDecksDataSaga);
	yield* sessionSaga();
	yield* userSaga();
	yield* dictSaga();
}

function* fetchDecksDataSaga() {
  yield take(actionTypes.RECEIVE_DECKS_DATA);
  const snapshot = yield call(rsf.getCollection, "Decks");
  yield put(actions.receiveDecksData(snapshot.docs[0].data().CardDecks));
}

function* dictSaga(): SagaIterator {
	yield takeEvery(actionTypes.START_SEARCH_WORD, function*(action) {
		const word = (action as actionTypes.IAction).payload.word;
		const searchRes: SearchResult = (action as actionTypes.IAction).payload.dict.search(word);
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
