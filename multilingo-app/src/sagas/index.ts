import { SagaIterator } from 'redux-saga';
import { call, put, race, select, take, takeEvery } from 'redux-saga/effects';

import { push } from 'connected-react-router'

import * as actions from '../actions';
import * as actionTypes from '../actions/actionTypes';

function* mainSaga() {
	yield* sessionSaga();
}

function* sessionSaga(): SagaIterator {
	yield takeEvery(actionTypes.BACK_TO_MAIN, function*(action) {
		// clear selected deck
		yield put(actions.selectDeck());

		// redirect to main
		yield put(push('/main'));
  });
}

export default mainSaga;