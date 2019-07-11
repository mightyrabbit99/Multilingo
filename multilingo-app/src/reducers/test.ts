import { Reducer } from 'redux';

import { defaultTestState, ITestState } from './states';

import { SAVE_TEST_SETTINGS } from "../actions/actionTypes";

export const reducer: Reducer<ITestState> = (state = defaultTestState, action: any) => {
  switch (action.type) {
		case SAVE_TEST_SETTINGS:
		return {
			...state,
			settings: action.payload.settings
		}
    default:
      return state;
  }
};