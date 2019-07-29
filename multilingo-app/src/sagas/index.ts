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

//extension
import { Card, createCard, CardType } from "../extension/cards";

//database
import rsf from "../backend/rsf";
import { Type, classToPlain, plainToClass } from "class-transformer";
import { SearchResult } from "../extension/dict";
import { CardDeck } from "../extension/cards";

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
  const cardDecks = snapshot.data().TestDecks;
  yield put(actions.receiveDecksData(plainToClass(CardDeck, cardDecks)));
}

//Add Decks to Firebase
function* updateDatabaseDecksSaga() {
  yield takeEvery(actionTypes.UPDATE_DATABASE_DECKS, function*(action) {
    const newCardDecks = (action as actionTypes.IAction).payload.decks;
    yield call(
      rsf.updateDocument,
      "Decks/n8Rs6Vb6SaiEZWB6o9fF",
      "TestDecks",
      classToPlain(newCardDecks)
    );
  });
}

function* dictSaga(): SagaIterator {
  yield takeEvery(actionTypes.START_SEARCH_WORD, function*(action) {
    const { word, lang } = (action as actionTypes.IAction).payload;
    const res = yield call(
      (action as actionTypes.IAction).payload.dict.search,
      word,
      lang
    );
    yield put(actions.wordSearched(res));
  });

  yield takeEvery(actionTypes.WORD_SEARCHED, function*(action) {
    const res = (action as actionTypes.IAction).payload.res[0];
    let allcards: Card[] = [];
    Object.keys(res.meaning).map((s: string, i: number) => {
      res.meaning[s].forEach((expl: any, i: number) => {
        allcards.push(
          createCard(s, `<${s}> ${expl.definition}`, res.word, CardType.Expl)
        );
        if (expl.example)
          allcards.push(createCard(s, expl.example, res.word, CardType.Ex));
        if (expl.synonyms)
          allcards.push(
            createCard(s, expl.synonyms.join(", "), res.word, CardType.Expl)
          );
      });
    });
    yield put(actions.newCardsGenerated(allcards));
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
